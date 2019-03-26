import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Watch} from '../../api-helpers/watch.js';
import {Atomic} from '../../utilities/atomic.js';

import {makeTemplate} from './watch-measure-templates.js';

export class WatchMeasure extends GWBWElement {
	constructor() {
		super();

		this.render = this.render.bind(this);
		this.increaseMinute = this.increaseMinute.bind(this);
		this.decreaseMinute = this.decreaseMinute.bind(this);
		this.addMeasure = this.addMeasure.bind(this);

		this.attachShadow({mode: `open`});
		this.setClickEvents([
			{target: `.increase-minute`, handler: this.increaseMinute},
			{target: `.decrease-minute`, handler: this.decreaseMinute},
			{target: `.now`, handler: this.addMeasure}
		]);
		this.setNamedSizes([
			{name: `small`, width: 1},
			{name: `large`, width: 600}
		]);
		this.getData();
	}

	connectedCallback() {
		super.connectedCallback();
		this.moment = moment().second(0).add(1, `minute`);
		this.isNewSession = false;
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		const $firstOfSet = this.shadowRoot.querySelector(`input[name=firstOfSet]`);
		if ($firstOfSet) {
			this.isNewSession = !!$firstOfSet.checked;
		}
		this.targetTimeString = this.moment.format(`hh:mm a`);
		this.shadowRoot.innerHTML = makeTemplate(this);
	}

	increaseMinute(event, target) {
		this.moment = this.moment.add(1, `minute`);
		this.render();
	}

	decreaseMinute(event, target) {
		this.moment = this.moment.subtract(1, `minute`);
		this.render();
	}

	addMeasure() {
		GA.event(`measure`, `add start`);
		const targetMoment = this.moment.format(`x`);
		const measuredMoment = moment();
		const adjustedMeasuredMoment =
			(this.atomicOffset > 0) ?
			measuredMoment.subtract(Math.abs(this.atomicOffset), `seconds`).format(`x`) :
			measuredMoment.add(Math.abs(this.atomicOffset), `seconds`).format(`x`);
		const firstOfSet = this.shadowRoot.querySelector(`[name=firstOfSet]`).checked;
		const url = `/measure/now/${this.watch._id}/${targetMoment}/${adjustedMeasuredMoment}/${firstOfSet}`;
		router.navigate(url);
	}

	async getData() {
		this.watch = await Watch.getWatch(router.params[`watchId`]);
		this.atomicOffset = await Atomic.getAtomicOffset();
		this.render();
	}
}

customElements.define(`gwbw-watch-measure`, WatchMeasure);
