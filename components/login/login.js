import {GA} from '../../ga.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Auth} from '../../api-helpers/auth.js';
import {router} from '../../router.js';

import {makeTemplate} from './login-templates.js';

export class Login extends GWBWElement {
	constructor() {
		super();

		this.onLogin = this.onLogin.bind(this);

		this.setNamedSizes([
			{name: `huge`, width: 1}
		]);
	}

	connectedCallback() {
		super.connectedCallback();
		this.render();
	}

	disconnectedCallback() {
		if (this.$form) { this.$form.removeEventListener(`submit`, this.onLogin); }
		super.disconnectedCallback();
	}

	render() {
		if (this.$form) { this.$form.removeEventListener(`submit`, this.onLogin); }
		this.innerHTML = makeTemplate(this);
		this.$form = this.querySelector(`form`);
		this.$form.addEventListener(`submit`, this.onLogin);
	}

	async onLogin(event) {
		event.preventDefault();
		const loginSuccessful = await Auth.login(this.$form);
		if (loginSuccessful) {
			GA.event(`login`, `success`);
			router.navigate(`/watches`);
		} else {
			GA.event(`login`, `fail`);
			alert(`Login failed. Try again?`);
		}
	}
}

customElements.define(`gwbw-login`, Login);
