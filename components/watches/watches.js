import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {WatchApi} from '../../api-helpers/watch.js';

import {makeTemplate} from './watches-templates.js';

export class Watches extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.setClickEvents([
			{target: `.edit-watch`, handler: this.onEdit},
			{target: `.delete-watch`, handler: this.onDelete}
		]);
	}

	connectedCallback() {
		super.connectedCallback();
		this.getWatches();
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

	async getWatches() {
		this.watches = await WatchApi.getWatches();
		this.render();
	}

	onEdit(event, target) {
		const watchId = target.getAttribute(`watch-id`);
		router.navigate(`/watches/edit/${watchId}`);
	}

	async onDelete(event, target) {
		const watchId = target.getAttribute(`watch-id`);
		const confirmDelete = confirm(`Do you really want to delete this watch and all its data?`);
		if (!confirmDelete) { return; }
		this.startWorking();
		const deleteSuccessful = await WatchApi.delete({watchId});
		this.stopWorking();
		if (deleteSuccessful) {
			GA.event(`watch`, `watch delete success`);
			this.getWatches();
		} else {
			GA.event(`watch`, `watch delete fail`);
			const messages = document.querySelector(`gwbw-messages`);
			if (messages) {
				messages.add({message: `Failed to delete watch. Try again?`, type: `error`});
			}
		}
	}
}

customElements.define(`gwbw-watches`, Watches);
