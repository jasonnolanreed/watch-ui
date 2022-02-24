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

	static get observedAttributes() { return [`positions`, `goodtoleranceplus`, `goodtoleranceminus`]; }
	get positions() { return this.getAttribute(`positions`); }
	set positions(stringifiedPositions) { this.setAttribute(`positions`, stringifiedPositions); }
	get goodtoleranceplus() { return this.getAttribute(`goodtoleranceplus`); }
	set goodtolerance(goodTolerancePlus) { this.setAttribute(`goodtoleranceplus`, goodTolerancePlus); }
	get goodtoleranceminus() { return this.getAttribute(`goodtoleranceminus`); }
	set goodtoleranceminus(goodToleranceMinus) { this.setAttribute(`goodtoleranceminus`, goodToleranceMinus); }

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === `positions` && newValue !== oldValue) {
			this.positionsData = JSON.parse(decodeURI(this.positions));
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
			if (this.positionsData && this.goodTolerancePlusNumber !== null && this.goodToleranceMinusNumber !== null && this._hasChartJS) { this.initChart(); }
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	initChart() {
		this.removeAttribute(`loading`);
		const cssStyles = window.getComputedStyle(document.body);
		const green = cssStyles.getPropertyValue(`--green`);
		const red = cssStyles.getPropertyValue(`--red`);

		let config = {
			type: `bar`,
			data: {
				labels: [], // measure target dates
				datasets: [{
					label: "",
					data: [],
					backgroundColor: [],
					borderColor: []
				}]
			},
			options: {
				responsive: true,
				plugins: {
					legend: false,
					autocolors: false,
					annotation: {
						annotations: {
							fastBadZone: {
								type: `box`,
								adjustScaleRange: false,
								drawTime: `beforeDraw`,
								yScaleId: `y-axis-0`,
								yMin: this.goodTolerancePlusNumber,
								yMax: 999,
								backgroundColor: `${red}44`,
								borderColor: `transparent`
							},
							goodZone: {
								type: `box`,
								adjustScaleRange: false,
								drawTime: `beforeDraw`,
								yScaleId: `y-axis-0`,
								yMin: -1 * this.goodToleranceMinusNumber,
								yMax: this.goodTolerancePlusNumber,
								backgroundColor: `${green}44`,
								borderColor: `transparent`
							},
							slowBadZone: {
								type: `box`,
								adjustScaleRange: false,
								drawTime: `beforeDraw`,
								yScaleId: `y-axis-0`,
								yMin: -999,
								yMax: -1 * this.goodToleranceMinusNumber,
								backgroundColor: `${red}44`,
								borderColor: `transparent`
							},
							zeroLine: {
								type: `line`,
								yMin: 0,
								yMax: 0,
								borderColor: `#333`,
								borderWidth: 1
							}
						}
					}
				}
			}
		};

		// get list of used positions in order of positionsMap
		let sortedPositionsList = [];
		Object.keys(positionsMap).map(positionKey => {
			if (this.positionsData[positionKey]) {
				sortedPositionsList.push(positionKey);
			}
		});

		let positionLabels = [];
		let rates = [];
		let colors = [];
		sortedPositionsList.forEach(positionKey => {
			const position = this.positionsData[positionKey];
			positionLabels.push(positionsMap[position.name].label);
			rates.push(position.rate);
			const isGood = position.rate <= this.goodTolerancePlusNumber && position.rate >= -1 * this.goodToleranceMinusNumber;
			colors.push(isGood ? green : red);
		});
		config.data.labels = positionLabels;
		config.data.datasets[0].data = rates;
		config.data.datasets[0].backgroundColor = colors;
		config.data.datasets[0].borderColor = colors;

		this.graph = new Chart(
			this.querySelector(`canvas`),
			config
		);
	}
}

customElements.define(`gwbw-positions-graph`, PositionsGraph);
