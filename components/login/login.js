import {GA} from '../../ga.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Auth} from '../../api-helpers/auth.js';
import {router} from '../../router.js';

import {makeTemplate} from './login-templates.js';

export class Login extends GWBWElement {
	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();
		this.bindForm();
		this.render();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		super.render();
		this.innerHTML = makeTemplate(this);
	}

	async onSubmit(event, target) {
		this.startWorking();
		const loginSuccessful = await Auth.login(target);
		this.stopWorking();
		if (loginSuccessful) {
			GA.event(`login`, `login success`);
			router.navigate(`/watches`);
		} else {
			GA.event(`login`, `login fail`);
			alert(`Login failed. Try again?`);
		}
	}
}

customElements.define(`gwbw-login`, Login);
