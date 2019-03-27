import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Measure} from '../../api-helpers/measure.js';

import {makeTemplate} from './measure-interval-templates.js';

export class MeasureInterval extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.setNamedSizes([
			{name: `huge`, width: 1}
		]);
	}

	async connectedCallback() {
		super.connectedCallback();
		this.getData();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		this.shadowRoot.innerHTML = makeTemplate(this);
	}

	getData() {
		Promise.all([
			Measure.getMeasure(router.params[`measureOne`]),
			Measure.getMeasure(router.params[`measureTwo`])
		])
		.then(measures => {
			this.startMeasure = (measures[0].targetMoment < measures[1].targetMoment) ? measures[0] : measures[1];
			this.endMeasure = (measures[0].targetMoment < measures[1].targetMoment) ? measures[1] : measures[0];
			this.render();
		});
	}
}

customElements.define(`gwbw-measure-interval`, MeasureInterval);
