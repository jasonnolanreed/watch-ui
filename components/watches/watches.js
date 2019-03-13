import {NamedSizeElement} from '../../classes/named-size.js';

import {makeTemplate} from './watches-templates.js';

export class Watches extends NamedSizeElement {
	constructor() {
		super();

		this.render = this.render.bind(this);

		this.attachShadow({mode: `open`});
		this.render();
		this.setNamedSizes([
			{name: `huge`, width: 1}
		]);
	}

	connectedCallback() {
		super.connectedCallback();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		this.shadowRoot.innerHTML = makeTemplate(this);
	}
}

customElements.define(`gwbw-watches`, Watches);
