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
		try {
			this.innerHTML = makeTemplate(this);
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	async onSubmit(event, target) {
		this.startWorking();
		const loginSuccessful = await Auth.login(target);
		this.stopWorking();
		if (loginSuccessful) {
			GA.event(`login`, `login success`);
			if (Auth.preAuthHash && Auth.preAuthHash !== `/login`) {
				router.navigate(Auth.preAuthHash);
			} else {
				router.navigate(`/watches`);
			}
		} else {
			GA.event(`login`, `login fail`);
			const messages = document.querySelector(`gwbw-messages`);
			if (messages) {
				messages.add({message: `Login failed. Try again?`, type: `error`});
			}
		}
	}
}

customElements.define(`gwbw-login`, Login);
