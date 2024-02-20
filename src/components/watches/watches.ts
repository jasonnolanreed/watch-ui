import {GA} from '../../ga.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Messages} from '../messages/messages.js';
import {Watch, WatchApi} from '../../api-helpers/watch.js';
import {PreferenceApi, Preferences} from '../../api-helpers/preference.js';

import {makeTemplate} from './watches-templates.js';

export class Watches extends GWBWElement {
	watches: Watch[];
	preferences: Preferences;

	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.setClickEvents([
			{target: `.delete-watch`, handler: this.onDelete},
			{target: `.toggle-buttons button`, handler: this.onChangeSort}
		]);
	}

	connectedCallback() {
		super.connectedCallback();
		this.getData();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		super.render();
		try {
			this.sortWatches();
			this.shadowRoot.innerHTML = makeTemplate(this);
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	async getData() {
		const data = await Promise.all([
			WatchApi.getWatches(),
			PreferenceApi.getPreferences()
		]);
		this.watches = data[0];
		this.preferences = data[1];
		this.render();
	}

	async onDelete(event, target) {
		const watchId = target.getAttribute(`watch-id`);
		const confirmDelete = window.confirm(`Do you really want to delete this watch and all its data?`);
		if (!confirmDelete) { return; }
		this.startWorking();
		const deleteSuccessful = await WatchApi.delete({watchId});
		this.stopWorking();
		if (deleteSuccessful) {
			GA.event(`watch`, `watch delete success`);
			this.getData();
		} else {
			GA.event(`watch`, `watch delete fail`);
			const messages: Messages = document.querySelector(`gwbw-messages`);
			if (messages) {
				messages.add({message: `Failed to delete watch. Try again?`, type: `error`});
			}
		}
	}

	onChangeSort(event, target) {
		let newSortValue =
			target.classList.contains(`name`) ? `name` :
			target.classList.contains(`measured`) ? `measured` :
			`created`;
		if (
			target.classList.contains(`name`) && this.preferences.watchesSort.includes(`name`)
			||
			target.classList.contains(`measured`) && this.preferences.watchesSort.includes(`measured`)
			||
			target.classList.contains(`created`) && this.preferences.watchesSort.includes(`created`)
		) {
			// just toggling direction
			newSortValue += this.preferences.watchesSort.includes(`Asc`) ? `Desc` : `Asc`;
		} else {
			// changing sort type, default to asc
			newSortValue += `Asc`;
		}
		this.preferences.watchesSort = newSortValue;
		this.render();
		PreferenceApi.updatePreferences({watchesSort: newSortValue});
	}

	sortWatches() {
		const sortField =
			this.preferences.watchesSort.includes(`name`) ? `name` :
			this.preferences.watchesSort.includes(`measured`) ? `lastMeasured` :
			`_id`;

		this.watches.sort((thisWatch, nextWatch) => {
			if (this.preferences.watchesSort.includes(`Asc`)) {
				return thisWatch[sortField] >= nextWatch[sortField] ? 1 : -1;
			} else {
				return thisWatch[sortField] <= nextWatch[sortField] ? 1 : -1;
			}
		});
	}
}

customElements.define(`gwbw-watches`, Watches);
