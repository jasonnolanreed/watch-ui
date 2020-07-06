import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Auth} from '../../api-helpers/auth.js';

import {makeTemplate} from './nav-templates.js';

export class Nav extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.loggedIn = false;
		this.setClickEvents([
			{target: `.logout`, handler: this.logout}
		]);
	}

	async connectedCallback() {
		super.connectedCallback();
		this.loggedIn = await Auth.isLoggedIn();
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

	async logout(event) {
		const didLogOut = await Auth.logout();
		if (didLogOut) {
			GA.event(`logout`, `logout success`);
		} else {
			GA.event(`logout`, `logout fail`);
		}
		router.navigate(`/`);
	}
}

customElements.define(`gwbw-nav`, Nav);
