import {router} from '../../router.js';
import {NamedSizeElement} from '../../classes/named-size.js';
import {Watch} from '../../api-helpers/watch.js';
import {Atomic} from '../../utilities/atomic.js';

import {makeTemplate} from './watch-measure-templates.js';

export class WatchMeasure extends NamedSizeElement {
	constructor() {
		super();

		this.render = this.render.bind(this);
		this.onClick = this.onClick.bind(this);

		this.attachShadow({mode: `open`});
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
		this.addEventListener(`click`, this.onClick);
	}

	disconnectedCallback() {
		this.removeEventListener(`click`, this.onClick);
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

	onClick(event) {
		if (!event || !event.path || !event.path.length) { return; }
		for (let target of event.path) {
			if (typeof target.matches !== `function`) { continue; }
			if (target.matches(`.increase-minute`)) {
				event.preventDefault();
				this.moment = this.moment.add(1, `minute`);
				this.render();
				break;
			}
			if (target.matches(`.decrease-minute`)) {
				event.preventDefault();
				this.moment = this.moment.subtract(1, `minute`);
				this.render();
				break;
			}
			if (target.matches(`.now`)) {
				event.preventDefault();
				this.addMeasure();
				break;
			}
		}
	}

	async getData() {
		this.watch = await Watch.getWatch(router.params[`watchId`]);
		this.atomicOffset = await Atomic.getAtomicOffset();
		this.render();
	}

	addMeasure() {
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
}

customElements.define(`gwbw-watch-measure`, WatchMeasure);
