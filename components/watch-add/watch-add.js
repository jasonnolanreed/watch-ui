import {router} from '../../router.js';
import {NamedSizeElement} from '../../classes/named-size.js';
import {Watch} from '../../api-helpers/watch.js';
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './watch-add-templates.js';

export class WatchAdd extends NamedSizeElement {
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
			router.navigate(`/watches`);
		} else {
			alert(`Failed to add watch. Try again?`);
		}
	}
}

customElements.define(`gwbw-watch-add`, WatchAdd);