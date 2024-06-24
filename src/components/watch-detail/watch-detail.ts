import {Preferences, Watch} from '../../types/api-data.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {PreferenceApi} from '../../api-helpers/preference.js';
import {WatchApi} from '../../api-helpers/watch.js';

import {makeTemplate} from './watch-detail-templates.js';

export class WatchDetail extends GWBWElement {
	watch: Watch;
	preferences: Preferences;

	constructor() {
		super();
		this.attachShadow({mode: `open`});
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
			this.shadowRoot.innerHTML = makeTemplate(this);
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	async getData() {
		const responses = await Promise.all([
			WatchApi.getWatch(router[`params`][`watchId`]),
			PreferenceApi.getPreferences(),
		]);

		this.watch = responses[0];
		this.preferences = responses[1];

		this.render();
	}
}

customElements.define(`gwbw-watch-detail`, WatchDetail);
