import {GWBWElement} from '../../classes/gwbw-element.js';
import {Difference, Format} from '../../utilities/date-time.js';
import {roundToTwoDecimals} from '../../utilities/number.js';
import {positionsMap} from '../../utilities/position.js';
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

		this.fetchRequiredScripts([`../../vendor/chart.js`, `../../vendor/chart-annotations.js`])
		.then(_ => {
			this._hasChartJS = true;
			this.render();
		});
	}

	static get observedAttributes() { return [`measures`, `watch`]; }
	get measures() { return this.getAttribute(`measures`); }
	set measures(stringifiedMeasures) { this.setAttribute(`measures`, stringifiedMeasures); }
	get watch() { return this.getAttribute(`watch`); }
	set watch(stringifiedWatch) { this.setAttribute(`watch`, stringifiedWatch); }

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === `measures` && newValue !== oldValue) {
			this.measuresData = JSON.parse(decodeURI(this.measures));
			this.render();
		}
		if (name === `watch` && newValue !== oldValue) {
			this.watchData = JSON.parse(decodeURI(this.watch));
			this.render();
		}
	}

	connectedCallback() {
		super.connectedCallback();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		try {
			this.innerHTML = makeTemplate(this);
			if (this.measuresData && this.watchData && this._hasChartJS) { this.initChart(); }
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	initChart() {
		this.removeAttribute(`loading`);
		const {measuresData, watchData} = this;
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
					annotation: {
						annotations: {
							fastest: {
								type: `line`,
								drawTime: `beforeDraw`,
								yMin: _ => fastestPoint,
								yMax: _ => fastestPoint,
								borderColor: `${blue}15`,
								borderWidth: 3,
							},
							slowest: {
								type: `line`,
								drawTime: `beforeDraw`,
								yMin: _ => slowestPoint,
								yMax: _ => slowestPoint,
								borderColor: `${blue}15`,
								borderWidth: 3,
							}
						}
					}
				}
			}
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
		measuresData.forEach(thisMeasure => {
			const point = {
				x: thisMeasure.targetMoment,
				y: roundToTwoDecimals(Difference.seconds(thisMeasure.moment, thisMeasure.targetMoment))
			};
			points.push(point);
			zeroPoints.push({
				x: thisMeasure.targetMoment,
				y: 0
			});
			if (!fastestPoint || fastestPoint < point.y) { fastestPoint = point.y; }
			if (!slowestPoint || slowestPoint > point.y) { slowestPoint = point.y; }
		});
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
			return `${positionsMap[endMeasure.position].label}: ${rate > 0 ? '+' : ''}${rate} seconds/day`;
		}
	}
}

customElements.define(`gwbw-deviation-graph`, DeviationGraph);
