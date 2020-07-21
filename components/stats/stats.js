import {GWBWElement} from '../../classes/gwbw-element.js';
import {StatsApi} from '../../api-helpers/stats.js';

import {makeTemplate} from './stats-templates.js';

export class Stats extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
	}

	async connectedCallback() {
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

	getData() {
		StatsApi.getStats()
		.then(stats => {
			this.stats = stats;
			this.render();
		});
	}
}

customElements.define(`gwbw-stats`, Stats);
