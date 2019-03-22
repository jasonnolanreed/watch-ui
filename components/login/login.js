import {GA} from '../../ga.js';
import {NamedSizeElement} from '../../classes/named-size.js';
import {getFormData} from '../../utilities/form.js';
import {Auth} from '../../api-helpers/auth.js';
import {router} from '../../router.js';

import {makeTemplate} from './login-templates.js';

export class Login extends NamedSizeElement {
	constructor() {
		super();

		this.render = this.render.bind(this);
		this.onLogin = this.onLogin.bind(this);

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
		if (this.$form) { this.$form.removeEventListener(`submit`, this.onLogin); }
		super.disconnectedCallback();
	}

	render() {
		if (this.$form) { this.$form.removeEventListener(`submit`, this.onLogin); }
		this.shadowRoot.innerHTML = makeTemplate(this);
		this.$form = this.shadowRoot.querySelector(`form`);
		this.$form.addEventListener(`submit`, this.onLogin);
	}

	async onLogin(event) {
		event.preventDefault();
		const loginSuccessful = await Auth.login(getFormData(this.$form));
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
