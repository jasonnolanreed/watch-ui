import {NamedSizeElement} from '../../classes/named-size.js';
import {makeTemplate} from './nav-templates.js';

export class Nav extends NamedSizeElement {
	constructor() {
		super();
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

customElements.define(`gwbw-nav`, Nav);
