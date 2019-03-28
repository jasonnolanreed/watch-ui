import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Watch} from '../../api-helpers/watch.js';
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './watch-add-templates.js';

export class WatchAdd extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.setNamedSizes([
			{name: `huge`, width: 1}
		]);
	}

	connectedCallback() {
		super.connectedCallback();
		this.bindShadowForm();
		this.render();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		this.shadowRoot.innerHTML = makeTemplate(this);
	}

	async onSubmit(event, target) {
		const addSuccessful = await Watch.add(getFormData(target));
		if (addSuccessful) {
			GA.event(`watch`, `watch add success`);
			router.navigate(`/watches`);
		} else {
			GA.event(`watch`, `watch add fail`);
			alert(`Failed to add watch. Try again?`);
		}
	}
}

customElements.define(`gwbw-watch-add`, WatchAdd);
