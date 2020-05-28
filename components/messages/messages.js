import {GWBWElement} from '../../classes/gwbw-element.js';
import {makeCss, getMessageElement} from './messages-templates.js';

export class Messages extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.add = this.add.bind(this);
	}

	connectedCallback() {
		super.connectedCallback();
		this.initialRender();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	initialRender() {
		this.shadowRoot.innerHTML = makeCss(this);
	}

	/*
	options {
		message: string,
		type: 'info'|'success'|'error',
		ttl?: number,
		dismissable?: boolean
	}
	*/
	add(options = {}) {
		const template = document.createElement(`template`);
		const message = getMessageElement(options);
		template.style.display = `block`;
		template.appendChild(message);
		this.shadowRoot.appendChild(template.cloneNode(true));
		const currentMessages = this.shadowRoot.querySelectorAll(`gwbw-message`);
		// Return refernce to newly added message
		return currentMessages[currentMessages.length - 1];
	}
}

customElements.define(`gwbw-messages`, Messages);
