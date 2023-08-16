import {GWBWElement} from '../../classes/gwbw-element.js';
import {CustomPositionsApi} from '../../api-helpers/custom-positions.js';
import {Difference, Format} from '../../utilities/date-time.js';
import {getMomentDiffFromMeasure} from '../../utilities/measure.js';
import {roundToOneDecimal} from '../../utilities/number.js';
import {getPositionNameForMeasure, positionsMap} from '../../utilities/position.js';
import {Timing} from '../../utilities/timing.js';
import {makeTemplate} from './deviation-graph-templates.js';

export class DeviationGraph extends GWBWElement {
	constructor() {
		super();
		super.render(); // kill default loading UI immediately
		this.setAttribute(`loading`, true);
		this.render(); // render immmediately for placeholder UI
		this.initChart = this.initChart.bind(this);
		this._hasChartJS = false;
		this.measuresData = null;
		this.watchData = null;
		this.graph = null;
	}

	static get observedAttributes() { return [`measures`, `watch`]; }
	get measures() { return this.getAttribute(`measures`); }
	set measures(stringifiedMeasures) { this.setAttribute(`measures`, stringifiedMeasures); }
	get watch() { return this.getAttribute(`watch`); }
	set watch(stringifiedWatch) { this.setAttribute(`watch`, stringifiedWatch); }

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === `measures` && newValue !== oldValue) {
			if (this.measures !== "undefined") {
				this.measuresData = JSON.parse(decodeURI(this.measures));
			}
			this.render();
		}
		if (name === `watch` && newValue !== oldValue) {
			this.watchData = JSON.parse(decodeURI(this.watch));
			this.render();
		}
	}

	async connectedCallback() {
		super.connectedCallback();
		await this.fetchRequiredScripts([`../../vendor/chart.js`])
		this._hasChartJS = true;
		this.customPositions = await CustomPositionsApi.getCustomPositions();
		this.render();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		try {
			this.innerHTML = makeTemplate(this);
			if (
				this.measuresData && this.measuresData.length > 1 &&
				this.watchData && this._hasChartJS && this.customPositions
			) { this.initChart(); }
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	initChart() {
		this.removeAttribute(`loading`);
		const {measuresData, watchData, customPositions} = this;
		const cssStyles = window.getComputedStyle(document.body);
		const blue = cssStyles.getPropertyValue(`--blue`);
		const lightBlue = cssStyles.getPropertyValue(`--light-blue`);
		const green = cssStyles.getPropertyValue(`--green`);
		const red = cssStyles.getPropertyValue(`--red`);

		let config = {
			type: `scatter`,
			data: {
				labels: [], // measure target dates
				datasets: [
					{
						label: `Deviation`,
						showLine: true,
						backgroundColor: blue,
						borderColor: blue,
						data: [], // deviation amounts,
						segment: {
							borderColor: point => getGoodBadColor(point)
						},
						tension: 0.2
					},
					{
						label: `Actual Time`,
						showLine: true,
						backgroundColor: lightBlue,
						borderColor: lightBlue,
						data: []
					}
				]
			},
			options: {
				animation: false,
				layout: {
					autoPadding: false
				},
				scales: {
					x: {
						grid:{
							display: false
						},
						min: getXScaleMin(),
						max: getXScaleMax(),
						ticks: {
							callback: (val, index) => ``
						}
					},
					y: {
						display: true,
						position: `right`,
						suggestedMax: _ => {
							const maxAfterDrift = points[0].y + (watchData.goodTolerancePlus * days);
							return Math.max(fastestPoint, maxAfterDrift);
						},
						suggestedMin: _ => {
							const minAfterDrift = points[0].y - (watchData.goodToleranceMinus * days);
							return Math.min(slowestPoint, minAfterDrift);
						}
					}
				},
				plugins: {
					legend: false,
					title: {
						display: true,
						text: "Deviation vs Actual Time"
					},
					tooltip: {
						callbacks: {
							label: point => getLabel(point),
							footer: point => getTooltip(point)
						}
					},
					chartAreaBorder: {
						borderColor: `${lightBlue}55`,
						borderWidth: 1
					}
				}
			},
			plugins: [
				{
					id: `chartAreaBorder`,
					beforeDraw(chart, args, options) {
						const {ctx, chartArea: {left, top, width, height}} = chart;
						ctx.save();
						ctx.strokeStyle = options.borderColor;
						ctx.lineWidth = options.borderWidth;
						ctx.setLineDash(options.borderDash || []);
						ctx.lineDashOffset = options.borderDashOffset;
						ctx.strokeRect(left, top, width, height);
						ctx.restore();
					}
				},
				{
					id: `goodZone`,
					beforeDraw(chart, args, options) {
						const {ctx} = chart;
						const metaPoints = chart._metasets[0].data;
						const firstPoint = points[0];
						const lastPoint = points[points.length - 1];
						const firstMetaPoint = metaPoints[0];
						const lastMetaPoint = metaPoints[metaPoints.length - 1];
						const pixelModifier = Math.abs(firstMetaPoint.y - lastMetaPoint.y) / Math.abs(firstPoint.y - lastPoint.y);

						ctx.save();
						ctx.beginPath();
						ctx.moveTo(firstMetaPoint.x, firstMetaPoint.y);
						ctx.lineTo(lastMetaPoint.x, firstMetaPoint.y - (pixelModifier * watchData.goodTolerancePlus * days));
						ctx.lineTo(lastMetaPoint.x, firstMetaPoint.y + (pixelModifier * watchData.goodToleranceMinus * days));
						ctx.fillStyle = `${green}22`;
						ctx.fill();
						ctx.restore();
					}
				}
			]
		};

		let labels = []; // measure target dates
		measuresData.forEach(thisMeasure => {
			labels.push(Format.date(thisMeasure.targetMoment));
		});
		config.data.labels = labels;

		let points = [];
		let zeroPoints = [];
		let fastestPoint = null;
		let slowestPoint = null;
		let days = 0;
		measuresData.forEach(thisMeasure => {
			const point = {
				x: thisMeasure.targetMoment,
				y: roundToOneDecimal(Difference.seconds(thisMeasure.moment, thisMeasure.targetMoment))
			};
			points.push(point);
			zeroPoints.push({
				x: thisMeasure.targetMoment,
				y: 0
			});
			if (!fastestPoint || fastestPoint < point.y) { fastestPoint = point.y; }
			if (!slowestPoint || slowestPoint > point.y) { slowestPoint = point.y; }
		});
		days = Difference.days(points[0].x, points[points.length - 1].x);
		config.data.datasets[0].data = points;
		config.data.datasets[1].data = zeroPoints;

		this.graph = new Chart(
			this.querySelector(`canvas`),
			config
		);

		function getGoodBadColor(point) {
			const startMeasure = measuresData[point.p1DataIndex - 1];
			const endMeasure = measuresData[point.p1DataIndex];
			const rate = -1 * Timing.rate(startMeasure.moment, startMeasure.targetMoment, endMeasure.moment, endMeasure.targetMoment);
			return rate <= watchData.goodTolerancePlus && rate >= -1 * watchData.goodToleranceMinus ? green : red;
		}

		function getXScaleMin() {
			const start = +measuresData[0].targetMoment;
			const end = +measuresData[measuresData.length - 1].targetMoment;
			const buffer = (end - start) * .025;
			return start - buffer;
		}

		function getXScaleMax() {
			const start = +measuresData[0].targetMoment;
			const end = +measuresData[measuresData.length - 1].targetMoment;
			const buffer = (end - start) * .025;
			return end + buffer;
		}

		function getLabel(activePoint) {
			const point = activePoint;
			const measure = measuresData[point.dataIndex];
			return `${Format.date(measure.targetMoment)}, ${Format.time(measure.targetMoment)}`;
		}

		function getTooltip(activePoint) {
			const point = activePoint[0];
			if (point.dataset.label.toLowerCase() === `actual time`) { return; }
			if (point.dataIndex === 0) { return; }
			const startMeasure = measuresData[point.dataIndex - 1];
			const endMeasure = measuresData[point.dataIndex];
			if (!startMeasure || !endMeasure) { return; }
			const rate = -1 * Timing.rate(startMeasure.moment, startMeasure.targetMoment, endMeasure.moment, endMeasure.targetMoment);
			const deviation = roundToOneDecimal(getMomentDiffFromMeasure(endMeasure));

			return `${getPositionNameForMeasure(endMeasure, customPositions)}: ${rate > 0 ? '+' : ''}${rate} seconds/day${'\n'}Deviation: ${deviation < 0 ? deviation : '+' + deviation}s`;
		}
	}
}

customElements.define(`gwbw-deviation-graph`, DeviationGraph);
