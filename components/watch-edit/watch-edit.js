import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Watch} from '../../api-helpers/watch.js';
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './watch-edit-templates.js';

export class WatchEdit extends GWBWElement {
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
		this.getData();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		this.shadowRoot.innerHTML = makeTemplate(this);
	}

	async getData() {
		this.watch = await Watch.getWatch(router.params[`watchId`]);
		console.log(`watch`, this.watch);
		this.render();
	}

	async onSubmit(event, target) {
		this.startWorking();
		const updateSuccessful = await Watch.update(getFormData(target));
		this.stopWorking();
		if (updateSuccessful) {
			GA.event(`watch`, `watch edit success`);
			router.navigate(`/watches`);
		} else {
			GA.event(`watch`, `watch edit fail`);
			alert(`Failed to edit watch. Try again?`);
		}
	}
}

customElements.define(`gwbw-watch-edit`, WatchEdit);
