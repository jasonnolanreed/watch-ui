import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {WatchApi} from '../../api-helpers/watch.js';
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './watch-edit-templates.js';

export class WatchEdit extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
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
		super.render();
		try {
			this.shadowRoot.innerHTML = makeTemplate(this);
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	async getData() {
		this.watch = await WatchApi.getWatch(router.params[`watchId`]);
		this.render();
	}

	async onSubmit(event, target) {
		this.startWorking();
		const updateSuccessful = await WatchApi.update(getFormData(target));
		this.stopWorking();
		if (updateSuccessful) {
			GA.event(`watch`, `watch edit success`);
			router.navigate(`/watches`);
		} else {
			GA.event(`watch`, `watch edit fail`);
			const messages = document.querySelector(`gwbw-messages`);
			if (messages) {
				messages.add({message: `Failed to edit watch. Try again?`, type: `error`});
			}
		}
	}
}

customElements.define(`gwbw-watch-edit`, WatchEdit);
