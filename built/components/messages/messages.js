import { GWBWElement } from '../../classes/gwbw-element.js';
import { makeCss, getMessageElement } from './messages-templates.js';
export class Messages extends GWBWElement {
    constructor() {
        super();
        this.attachShadow({ mode: `open` });
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
    add(options = {}) {
        if (options.messageId &&
            this.shadowRoot.querySelector(`gwbw-message[message-id="${options.messageId}"]`)) {
            return;
        }
        const template = document.createElement(`template`);
        const message = getMessageElement(options);
        template.style.display = `block`;
        template.appendChild(message);
        this.shadowRoot.appendChild(template.cloneNode(true));
        const $messagesAfter = this.shadowRoot.querySelectorAll(`gwbw-message`);
        // Return reference to newly added message
        return $messagesAfter[$messagesAfter.length - 1];
    }
    closeNonPersistent() {
        const messages = this.shadowRoot.querySelectorAll(`gwbw-message`);
        if (!messages.length) {
            return;
        }
        messages.forEach(thisMessage => {
            if (thisMessage.getAttribute(`persistent`) !== "true") {
                thisMessage.onClose();
            }
        });
    }
}
customElements.define(`gwbw-messages`, Messages);
