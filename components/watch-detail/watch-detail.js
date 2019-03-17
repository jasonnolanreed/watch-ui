import {router} from '../../router.js';
import {NamedSizeElement} from '../../classes/named-size.js';
import {Watch} from '../../api-helpers/watch.js';
import {Measure} from '../../api-helpers/measure.js';
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './watch-detail-templates.js';

export class WatchDetail extends NamedSizeElement {
	constructor() {
		super();

		this.render = this.render.bind(this);

		this.attachShadow({mode: `open`});
		this.setNamedSizes([
			{name: `huge`, width: 1}
		]);
		this.getData();
	}

	connectedCallback() {
		super.connectedCallback();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		this.shadowRoot.innerHTML = makeTemplate(this);
	}

	getData() {
		Promise.all([
			Watch.getWatch(router.params[`watchId`]),
			Measure.getMeasures(router.params[`watchId`])
		])
		.then(responses => {
			this.watch = responses[0];
			this.measures = responses[1];
			this.render();
		})
		.catch(error => null);
	}

	getTimestamp(measure) {
		return moment(+measure.moment).format("MMM Do, hh:mm a");
	}

	getMomentDiff(measure) {
		return Math.round(moment(+measure.targetMoment).diff(moment(+measure.moment), `seconds`, true) * 100) / 100;
	}

	getMomentDiffClass(measure) {
		return (this.getMomentDiff(measure) < 0) ? `slow` : `fast`;
	}

	getSessionTotal() {
		if (!this.measures || this.measures.length < 2) { return ``; }
		const sessionDistance =
			moment(+this.measures[this.measures.length - 1].moment).diff(+this.measures[0].moment, `days`, true);
		if (sessionDistance < 0.5) { return ``;}
		const sessionDrift =
			this.getMomentDiff(this.measures[this.measures.length - 1]) - this.getMomentDiff(this.measures[0]);
		return `Average: ${sessionDrift/sessionDistance} seconds/day`;
	}
}

customElements.define(`gwbw-watch-detail`, WatchDetail);
