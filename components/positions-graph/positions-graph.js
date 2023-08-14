import {GWBWElement} from '../../classes/gwbw-element.js';
import {positionsMap} from '../../utilities/position.js';
import {makeTemplate} from './positions-graph-templates.js';

export class PositionsGraph extends GWBWElement {
	constructor() {
		super();
		super.render(); // kill default loading UI immediately
		this.setAttribute(`loading`, true);
		this.render(); // render immmediately for placeholder UI
		this.initChart = this.initChart.bind(this);

		this._hasChartJS = false;
		this.positionsData = null;
		this.goodTolerancePlusNumber = null;
		this.goodToleranceMinusNumber = null;
		this.graph = null;

		this.fetchRequiredScripts([`../../vendor/chart.js`, `../../vendor/chart-annotations.js`])
		.then(_ => {
			this._hasChartJS = true;
			this.render();
		});
	}

	static get observedAttributes() { return [`positions`, `custompositions`, `goodtoleranceplus`, `goodtoleranceminus`, `sortedpositionnames`]; }
	get positions() { return this.getAttribute(`positions`); }
	set positions(stringifiedPositions) { this.setAttribute(`positions`, stringifiedPositions); }
	get custompositions() { return this.getAttribute(`custompositions`); }
	set custompositions(stringifiedCustomPositions) { this.setAttribute(`custompositions`, stringifiedCustomPositions); }
	get goodtoleranceplus() { return this.getAttribute(`goodtoleranceplus`); }
	set goodtolerance(goodTolerancePlus) { this.setAttribute(`goodtoleranceplus`, goodTolerancePlus); }
	get goodtoleranceminus() { return this.getAttribute(`goodtoleranceminus`); }
	set goodtoleranceminus(goodToleranceMinus) { this.setAttribute(`goodtoleranceminus`, goodToleranceMinus); }
	get sortedpositionnames() { return this.getAttribute(`goodtoleranceminus`); }
	set sortedpositionnames(sortedPositionNames) { this.setAttribute(`sortedpositionnames`, sortedPositionNames); }

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === `positions` && newValue !== oldValue) {
			this.positionsData = JSON.parse(decodeURI(this.positions));
			this.render();
		}
		if (name === `custompositions` && newValue !== oldValue) {
			this.customPositionsData = JSON.parse(decodeURI(this.custompositions));
			this.render();
		}
		if (name === `goodtoleranceplus` && newValue !== oldValue) {
			this.goodTolerancePlusNumber = +this.goodtoleranceplus;
			this.render();
		}
		if (name === `goodtoleranceminus` && newValue !== oldValue) {
			this.goodToleranceMinusNumber = +this.goodtoleranceminus;
			this.render();
		}
		if (name === `sortedpositionnames` && newValue !== oldValue) {
			this.sortedPositionNamesArray = newValue.split(`;;;`);
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
			if (this.positionsData && this.customPositionsData && this.goodTolerancePlusNumber !== null && this.goodToleranceMinusNumber !== null && this._hasChartJS) {
				this.initChart();
			}
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	initChart() {
		this.removeAttribute(`loading`);
		const positionsData = this.positionsData;
		const cssStyles = window.getComputedStyle(document.body);
		const green = cssStyles.getPropertyValue(`--green`);
		const red = cssStyles.getPropertyValue(`--red`);
		const darkBlue = cssStyles.getPropertyValue(`--dark-blue`);

		let config = {
			type: `bar`,
			data: {
				labels: [], // measure target dates
				datasets: [{
					label: "",
					data: [],
					backgroundColor: [],
					borderRadius: 3
				}]
			},
			options: {
				animation: false,
				responsive: true,
				scales: {
					y: {
						display: true,
						position: `right`,
						suggestedMax: this.goodTolerancePlusNumber * 1.5,
						suggestedMin: this.goodToleranceMinusNumber * -1.5
					}
				},
				plugins: {
					title: {
						display: true,
						text: `Average Performance by Position`
					},
					legend: false,
					autocolors: false,
					tooltip: {
						callbacks: {
							label: point => getTooltip(point)
						}
					},
					annotation: {
						annotations: {
							fastBadZone: {
								type: `box`,
								adjustScaleRange: false,
								drawTime: `beforeDraw`,
								yScaleId: `y-axis-0`,
								yMin: this.goodTolerancePlusNumber,
								yMax: 999,
								backgroundColor: `${red}33`,
								borderColor: `transparent`
							},
							goodZone: {
								type: `box`,
								adjustScaleRange: false,
								drawTime: `beforeDraw`,
								yScaleId: `y-axis-0`,
								yMin: -1 * this.goodToleranceMinusNumber,
								yMax: this.goodTolerancePlusNumber,
								backgroundColor: `${green}33`,
								borderColor: `transparent`
							},
							slowBadZone: {
								type: `box`,
								adjustScaleRange: false,
								drawTime: `beforeDraw`,
								yScaleId: `y-axis-0`,
								yMin: -999,
								yMax: -1 * this.goodToleranceMinusNumber,
								backgroundColor: `${red}33`,
								borderColor: `transparent`
							},
							zeroLine: {
								type: `line`,
								yMin: 0,
								yMax: 0,
								borderColor: `${darkBlue}55`,
								borderWidth: 1
							},
							goodFastLine: {
								type: `line`,
								drawTime: `beforeDraw`,
								yMin: this.goodTolerancePlusNumber,
								yMax: this.goodTolerancePlusNumber,
								borderColor: `${green}33`,
								borderWidth: 1
							},
							goodSlowLine: {
								type: `line`,
								drawTime: `beforeDraw`,
								yMin: -1 * this.goodToleranceMinusNumber,
								yMax: -1 * this.goodToleranceMinusNumber,
								borderColor: `${green}33`,
								borderWidth: 1
							}
						}
					}
				}
			}
		};

		// get list of used positions in order of positionsMap
		let sortedPositionsList = [];
		this.sortedPositionNamesArray.map(positionName => {
			if (positionsData[positionName]) {
				sortedPositionsList.push(positionName);
			}
		});

		let positionLabels = [];
		let rates = [];
		let colors = [];
		sortedPositionsList.forEach(positionKey => {
			const position = positionsData[positionKey];
			positionLabels.push(positionsMap[position.name]?.label || positionKey);
			rates.push(position.rate);
			const isGood = position.rate <= this.goodTolerancePlusNumber && position.rate >= -1 * this.goodToleranceMinusNumber;
			colors.push(isGood ? `${green}ee` : `${red}ee`);
		});
		config.data.labels = positionLabels;
		config.data.datasets[0].data = rates;
		config.data.datasets[0].backgroundColor = colors;
		config.data.datasets[0].borderColor = colors;

		this.graph = new Chart(
			this.querySelector(`canvas`),
			config
		);

		function getTooltip(point) {
			const position = positionsData[sortedPositionsList[point.dataIndex]];
			return `${position.rate > 0 ? '+' : ''}${position.rate} seconds/day`;
		}
	}
}

customElements.define(`gwbw-positions-graph`, PositionsGraph);
