import {GWBWElement} from '../../classes/gwbw-element.js';
import {Difference, Format} from '../../utilities/date-time.js';
import {roundToTwoDecimals} from '../../utilities/number.js';
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
		this.graph = null;

		this.fetchRequiredScripts([`../../vendor/chart.js`])
		.then(_ => {
			this._hasChartJS = true;
			this.render();
		});
	}

	static get observedAttributes() { return [`measures`]; }
	get measures() { return this.getAttribute(`measures`); }
	set measures(stringifiedMeasures) { this.setAttribute(`measures`, stringifiedMeasures); }

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === `measures` && newValue !== oldValue) {
			this.measuresData = JSON.parse(decodeURI(this.measures));
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
			if (this.measuresData && this._hasChartJS) { this.initChart(); }
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	initChart() {
		this.removeAttribute(`loading`);
		const cssStyles = window.getComputedStyle(document.body);
		let config = {
			type: `line`,
			data: {
				labels: [], // measure target dates
				datasets: [
				{
					label: `Deviation`,
					backgroundColor: cssStyles.getPropertyValue(`--blue`),
					borderColor: cssStyles.getPropertyValue(`--blue`),
					data: [] // deviation amounts
				},
				{
					label: `Actual Time`,
					backgroundColor: cssStyles.getPropertyValue(`--light-blue`),
					borderColor: cssStyles.getPropertyValue(`--light-blue`),
					data: []
				}
			]
			},
			options: {}
		};

		let labels = []; // measure target dates
		this.measuresData.forEach(thisMeasure => {
			labels.push(Format.date(thisMeasure.targetMoment));
		});
		config.data.labels = labels;

		let points = [];
		let zeroPoints = [];
		this.measuresData.forEach(thisMeasure => {
			points.push(roundToTwoDecimals(Difference.seconds(thisMeasure.moment, thisMeasure.targetMoment)));
			zeroPoints.push(0);
		});
		config.data.datasets[0].data = points;
		config.data.datasets[1].data = zeroPoints;


		this.graph = new Chart(
			this.querySelector(`canvas`),
			config
		);
	}
}

customElements.define(`gwbw-deviation-graph`, DeviationGraph);
