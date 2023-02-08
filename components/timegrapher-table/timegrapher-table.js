import {GWBWElement} from '../../classes/gwbw-element.js';

import {makeTemplate} from './timegrapher-table-templates.js';

export class TimegrapherTable extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
	}

	static get observedAttributes() { return [`timegrapherresults`]; }
	get timegrapherresults() { return this.getAttribute(`timegrapherresults`); }
	set timegrapherresults(stringifiedResults) { this.setAttribute(`timegrapherresults`, stringifiedResults); }

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === `timegrapherresults` && newValue !== oldValue) {
			if (this.timegrapherresults !== "undefined") {
				this.timegrapherResultsData = JSON.parse(decodeURI(this.timegrapherresults));
			}
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
		super.render();
		try {
			this.shadowRoot.innerHTML = makeTemplate(this);
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}
}

customElements.define(`gwbw-timegrapher-table`, TimegrapherTable);
