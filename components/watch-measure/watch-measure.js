import {router} from '../../router.js';
import {NamedSizeElement} from '../../classes/named-size.js';
import {Watch} from '../../api-helpers/watch.js';
import {Measure} from '../../api-helpers/measure.js';
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './watch-measure-templates.js';

export class WatchMeasure extends NamedSizeElement {
	constructor() {
		super();

		this.render = this.render.bind(this);
		this.onClick = this.onClick.bind(this);

		this.attachShadow({mode: `open`});
		this.setNamedSizes([
			{name: `huge`, width: 1}
		]);
		this.getWatch();
	}

	connectedCallback() {
		super.connectedCallback();
		this.moment = moment().second(0).add(1, `minute`);
		this.addEventListener(`click`, this.onClick);
	}

	disconnectedCallback() {
		this.removeEventListener(`click`, this.onClick);
		super.disconnectedCallback();
	}

	render() {
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

	async getWatch() {
		this.watch = await Watch.getWatch(router.params[`watchId`]);
		this.render();
	}

	async addMeasure() {
		const didAdd = await Measure.addMeasure({
			watchId: this.watch._id,
			targetMoment: this.moment.format(`x`),
			moment: moment().format(`x`),
			firstOfSet: this.shadowRoot.querySelector(`[name=firstOfSet]`).checked
		});
		if (!didAdd) {
			alert(`Failed to add measure. Try again?`);
		} else {
			router.navigate(`/watches/detail/${this.watch._id}`);
		}
	}
}

customElements.define(`gwbw-watch-measure`, WatchMeasure);
