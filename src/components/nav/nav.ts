import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {AuthApi} from '../../api-helpers/auth.js';

import {makeTemplate} from './nav-templates.js';

export class Nav extends GWBWElement {
	loggedIn = false;
	isLoginView: boolean;

	constructor() {
		super();
		this.attachShadow({mode: `open`});
	}

	async connectedCallback() {
		super.connectedCallback();
		this.loggedIn = await AuthApi.isLoggedIn();
		this.isLoginView = location.hash === `#/login`;
		this.render();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		try {
			this.shadowRoot.innerHTML = makeTemplate(this);
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}
}

customElements.define(`gwbw-nav`, Nav);
