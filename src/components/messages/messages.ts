import {GWBWElement} from '../../classes/gwbw-element.js';
import {Message} from '../message/message.js';
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
		dismissable?: boolean,
		persistent?:boolean // whether or not to auto close on view change
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

	closeNonPersistent() {
		const messages: NodeListOf<Message> = this.shadowRoot.querySelectorAll(`gwbw-message`);
		if (!messages.length) { return; }
		messages.forEach(thisMessage => {
			if (thisMessage.getAttribute(`persistent`) !== "true") {
				thisMessage.onClose();
			}
		});
	}
}

customElements.define(`gwbw-messages`, Messages);
