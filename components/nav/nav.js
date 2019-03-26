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
		this.setNamedSizes([
			{name: `huge`, width: 1}
		]);
		this.setClickEvents([
			{target: `.logout`, handler: this.logout}
		]);
	}

	async connectedCallback() {
		super.connectedCallback();
		this.loggedIn = await Auth.isLoggedIn();
		this.render();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		this.shadowRoot.innerHTML = makeTemplate(this);
	}

	async logout(event) {
		const didLogOut = await Auth.logout();
		if (didLogOut) {
			GA.event(`logout`, `success`);
		} else {
			GA.event(`logout`, `fail`);
		}
		router.navigate(`/`);
	}
}

customElements.define(`gwbw-nav`, Nav);
