import {AuthApi} from '../../api-helpers/auth.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {router} from '../../router.js';
import {makeTemplate} from './header-templates.js';

export class Header extends GWBWElement {
	viewName: string;
	loggedIn = false;
	isLoginView: boolean;

	constructor() {
		super();
		this.viewName = router[`view`];
		this.attachShadow({mode: `open`});
	}

	async connectedCallback() {
		super.connectedCallback();
		this.loggedIn = await AuthApi.isLoggedIn();
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

customElements.define(`gwbw-header`, Header);
