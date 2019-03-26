import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Watch} from '../../api-helpers/watch.js';
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './watch-add-templates.js';

export class WatchAdd extends GWBWElement {
	constructor() {
		super();

		this.render = this.render.bind(this);
		this.onAdd = this.onAdd.bind(this);

		this.attachShadow({mode: `open`});
		this.setNamedSizes([
			{name: `huge`, width: 1}
		]);
		this.render();
	}

	connectedCallback() {
		super.connectedCallback();
	}

	disconnectedCallback() {
		if (this.$form) { this.$form.removeEventListener(`submit`, this.onAdd); }
		super.disconnectedCallback();
	}

	render() {
		if (this.$form) { this.$form.removeEventListener(`submit`, this.onAdd); }
		this.shadowRoot.innerHTML = makeTemplate(this);
		this.$form = this.shadowRoot.querySelector(`form`);
		this.$form.addEventListener(`submit`, this.onAdd);
	}

	async onAdd(event) {
		event.preventDefault();
		const addSuccessful = await Watch.add(getFormData(this.$form));
		if (addSuccessful) {
			GA.event(`watch`, `add success`);
			router.navigate(`/watches`);
		} else {
			GA.event(`watch`, `add fail`);
			alert(`Failed to add watch. Try again?`);
		}
	}
}

customElements.define(`gwbw-watch-add`, WatchAdd);
