import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Watch} from '../../api-helpers/watch.js';
// import {Atomic} from '../../utilities/atomic.js';
import {Shift, Format} from '../../utilities/date-time.js';

import {makeTemplate} from './watch-measure-templates.js';

export class WatchMeasure extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.setClickEvents([
			{target: `.increase-quarter`, handler: this.increaseQuarter},
			{target: `.decrease-quarter`, handler: this.decreaseQuarter},
			{target: `.now`, handler: this.addMeasure}
		]);
		this.setNamedSizes([
			{name: `small`, width: 1},
			{name: `large`, width: 600}
		]);
	}

	connectedCallback() {
		super.connectedCallback();
		// Exactly next minute
		this.moment = Shift.minutes(new Date(new Date().setSeconds(0)).setMilliseconds(0), 1);
		this.isNewSession = false;
		this.getData();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		super.render();
		const $firstOfSession = this.shadowRoot.querySelector(`input[name=firstOfSession]`);
		if ($firstOfSession) {
			this.isNewSession = !!$firstOfSession.checked;
		}
		this.targetTimeString = Format.timeWithSeconds(this.moment);
		this.shadowRoot.innerHTML = makeTemplate(this);
	}

	increaseQuarter(event, target) {
		this.moment = Shift.seconds(this.moment, 15);
		this.render();
	}

	decreaseQuarter(event, target) {
		this.moment = Shift.seconds(this.moment, -15);
		this.render();
	}

	addMeasure() {
		GA.event(`measure`, `measure add start`);
		const targetMoment = this.moment;
		const measuredMoment = Date.now();
		const adjustedMeasuredMoment =
			(this.atomicOffset > 0) ?
			Shift.seconds(measuredMoment, (-1 * Math.abs(this.atomicOffset))) :
			Shift.seconds(measuredMoment, Math.abs(this.atomicOffset));
		const firstOfSession = this.shadowRoot.querySelector(`[name=firstOfSession]`).checked;
		const url = `/measure/now/${this.watch._id}/${targetMoment}/${adjustedMeasuredMoment}/${firstOfSession}`;
		router.navigate(url);
	}

	async getData() {
		Promise.all([
			Watch.getWatch(router.params[`watchId`]),
			// Atomic.getAtomicOffset()
		])
		.then(responses => {
			this.watch = responses[0];
			this.atomicOffset = responses[1];
			this.render();
		})
		.catch(error => null);
	}
}

customElements.define(`gwbw-watch-measure`, WatchMeasure);
