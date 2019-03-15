import {router} from '../../router.js';
import {NamedSizeElement} from '../../classes/named-size.js';
import {Watch} from '../../api-helpers/watch.js';
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './watch-measure-templates.js';

export class WatchMeasure extends NamedSizeElement {
	constructor() {
		super();

		this.render = this.render.bind(this);

		this.attachShadow({mode: `open`});
		this.setNamedSizes([
			{name: `huge`, width: 1}
		]);
		this.getWatch();
	}

	connectedCallback() {
		super.connectedCallback();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		this.date = new Date();
		this.shadowRoot.innerHTML = makeTemplate(this);
	}

	async getWatch() {
		this.watch = await Watch.getWatch(router.params[`watchId`]);
		this.render();
	}
}

customElements.define(`gwbw-watch-measure`, WatchMeasure);
