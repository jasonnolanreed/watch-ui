import {GWBWElement} from '../../classes/gwbw-element.js';
import {Difference, Format} from '../../utilities/date-time.js';
import {roundToTwoDecimals} from '../../utilities/number.js';
import { positionsMap } from '../../utilities/position.js';
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
		this.goodToleranceNumber = null;
		this.graph = null;

		this.fetchRequiredScripts([`../../vendor/chart.js`])
		.then(_ => {
			this._hasChartJS = true;
			this.render();
		});
	}

	static get observedAttributes() { return [`positions`, `goodtolerance`]; }
	get positions() { return this.getAttribute(`positions`); }
	set positions(stringifiedPositions) { this.setAttribute(`positions`, stringifiedPositions); }
	get goodtolerance() { return this.getAttribute(`goodtolerance`); }
	set goodtolerance(goodTolerance) { this.setAttribute(`goodtolerance`, goodTolerance); }

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === `positions` && newValue !== oldValue) {
			this.positionsData = JSON.parse(decodeURI(this.positions));
			this.render();
		}
		if (name === `goodtolerance` && newValue !== oldValue) {
			this.goodToleranceNumber = +this.goodtolerance
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
			if (this.positionsData && this.goodToleranceNumber && this._hasChartJS) { this.initChart(); }
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
					legend: false
				}
			}
		};

		let positionLabels = [];
		let rates = [];
		let colors = [];
		Object.keys(this.positionsData).forEach(positionKey => {
			const position = this.positionsData[positionKey];
			positionLabels.push(positionsMap[position.name].label);
			rates.push(position.rate);
			colors.push((Math.abs(position.rate) <= this.goodToleranceNumber) ? green : red);
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
