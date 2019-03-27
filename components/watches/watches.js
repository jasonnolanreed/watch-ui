import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Watch} from '../../api-helpers/watch.js';

import {makeTemplate} from './watches-templates.js';

export class Watches extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.setClickEvents([
			{target: `.view-watch`, handler: this.onView},
			{target: `.list-item`, handler: this.onView},
			{target: `.delete-watch`, handler: this.onDelete}
		]);
		this.setNamedSizes([
			{name: `huge`, width: 1}
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
		this.shadowRoot.innerHTML = makeTemplate(this);
	}

	async getWatches() {
		this.watches = await Watch.getWatches();
		this.render();
	}

	onView(event, target) {
		const watchId = target.getAttribute(`watch-id`);
		router.navigate(`/watches/detail/${watchId}`);
	}

	async onDelete(event, target) {
		const watchId = target.getAttribute(`watch-id`);
		const confirmDelete = confirm(`Do you really want to delete this watch and all its data?`);
		if (!confirmDelete) { return; }
		const deleteSuccessful = await Watch.delete({watchId});
		if (deleteSuccessful) {
			GA.event(`watch`, `delete success`);
			this.getWatches();
		} else {
			GA.event(`watch`, `delete fail`);
			alert(`Failed to delete watch. Try again?`);
		}
	}
}

customElements.define(`gwbw-watches`, Watches);
