import {Preferences, Watch} from '../../types/api-data.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {WatchApi} from '../../api-helpers/watch.js';
import {PreferenceApi} from '../../api-helpers/preference.js';

import {makeTemplate} from './watches-templates.js';

export class Watches extends GWBWElement {
	watches: Watch[];
	preferences: Preferences;

	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.setClickEvents([
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

	onChangeSort(event: MouseEvent, target: HTMLElement) {
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
