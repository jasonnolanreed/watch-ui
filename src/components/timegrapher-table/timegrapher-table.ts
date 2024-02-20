import {GWBWElement} from '../../classes/gwbw-element.js';
import {Watch} from '../../api-helpers/watch.js';
import {roundToOneDecimal} from '../../utilities/number.js';
import {timegrapherPositions} from '../../utilities/timegrapher.js';

import {makeTemplate} from './timegrapher-table-templates.js';
import { TimegrapherResult } from '../../api-helpers/timegrapher.js';

export class TimegrapherTable extends GWBWElement {
	averages = {
		rate: 0,
		amplitude: 0,
		beatError: 0,
	};
	watchData: Watch;
	timegrapherResultsData: TimegrapherResult;

	constructor() {
		super();
		this.attachShadow({mode: `open`});
	}

	static get observedAttributes() { return [`watch`, `timegrapherresults`]; }
	get watch() { return this.getAttribute(`watch`); }
	set watch(stringifiedWatch) { this.setAttribute(`watch`, stringifiedWatch); }
	get timegrapherresults() { return this.getAttribute(`timegrapherresults`); }
	set timegrapherresults(stringifiedResults) { this.setAttribute(`timegrapherresults`, stringifiedResults); }

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === `watch` && newValue !== oldValue) {
			if (this.watch !== "undefined") {
				this.watchData = JSON.parse(decodeURI(this.watch));
			}
			this.render();
		}
		if (name === `timegrapherresults` && newValue !== oldValue) {
			if (this.timegrapherresults !== "undefined") {
				this.timegrapherResultsData = JSON.parse(decodeURI(this.timegrapherresults));
				this.setAverages();
			}
			this.render();
		}
	}

	setAverages() {
		let rates = [];
		let amplitudes = [];
		let beatErrors = [];
		
		timegrapherPositions.forEach(position => {
			if (this.timegrapherResultsData[position.id + "Rate"]) {
				rates.push(Number(this.timegrapherResultsData[position.id + "Rate"]));
			}
			if (this.timegrapherResultsData[position.id + "BeatError"]) {
				beatErrors.push(Number(this.timegrapherResultsData[position.id + "BeatError"]));
			}
			if (this.timegrapherResultsData[position.id + "Amplitude"]) {
				amplitudes.push(Number(this.timegrapherResultsData[position.id + "Amplitude"]));
			}
		});
		
		this.averages = {
			rate: roundToOneDecimal(rates.reduce((accumulator, thisValue) => accumulator + thisValue) / rates.length),
			amplitude: Math.round(amplitudes.reduce((accumulator, thisValue) => accumulator + thisValue) / amplitudes.length),
			beatError: roundToOneDecimal(beatErrors.reduce((accumulator, thisValue) => accumulator + thisValue) / beatErrors.length),
		};
	}

	connectedCallback() {
		super.connectedCallback();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		super.render();
		try {
			this.shadowRoot.innerHTML = makeTemplate(this);
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}
}

customElements.define(`gwbw-timegrapher-table`, TimegrapherTable);
