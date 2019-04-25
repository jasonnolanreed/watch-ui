import {GWBWElement} from '../../classes/gwbw-element.js';
import {makeTemplate} from './header-templates.js';

export class Header extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
	}

	connectedCallback() {
		super.connectedCallback();
		this.setNamedSizes(null);
		this.render();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		this.shadowRoot.innerHTML = makeTemplate(this);
	}
}

customElements.define(`gwbw-header`, Header);
