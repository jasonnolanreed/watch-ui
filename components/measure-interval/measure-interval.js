import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Measure} from '../../api-helpers/measure.js';
import {Watch} from '../../api-helpers/watch.js';

import {makeTemplate} from './measure-interval-templates.js';

export class MeasureInterval extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
	}

	async connectedCallback() {
		super.connectedCallback();
		this.getData();
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

	getData() {
		Promise.all([
			Measure.getMeasure(router.params[`measureOne`]),
			Measure.getMeasure(router.params[`measureTwo`])
		])
		.then(measures => {
			this.startMeasure = (measures[0].targetMoment < measures[1].targetMoment) ? measures[0] : measures[1];
			this.endMeasure = (measures[0].targetMoment < measures[1].targetMoment) ? measures[1] : measures[0];
			return Watch.getWatch(this.startMeasure.watchId)
		})
		.then(watch => {
			this.watch = watch;
			this.render();
		});
	}
}

customElements.define(`gwbw-measure-interval`, MeasureInterval);
