import {GWBWElement} from '../../classes/gwbw-element.js';
import {makeTemplate} from './message-templates.js';

export class Message extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.setClickEvents([
			{target: `.close`, handler: this.onClose}
		]);
		this.close = this.onClose.bind(this);
	}

	connectedCallback() {
		super.connectedCallback();
		this.render();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		try {
			this.shadowRoot.innerHTML = makeTemplate(this);
			this.setAttribute(`tabindex`, `0`);
			this.focus();
		} catch(error) {
			console.error(`Error rendering`, error);
		}
		const ttl = +this.getAttribute(`ttl`);
		if (ttl > 0) {
			setTimeout(_ => this.onClose(), ttl);
		}
	}

	onClose(event, target) {
		this.parentNode.removeChild(this);
	}
}

customElements.define(`gwbw-message`, Message);
