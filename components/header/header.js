import {NamedSizeElement} from '../../classes/named-size.js';
import {makeTemplate} from './header-templates.js';

export class Header extends NamedSizeElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.render();
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

customElements.define(`gwbw-header`, Header);
