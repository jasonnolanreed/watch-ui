import {GA} from '../../ga.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Auth} from '../../api-helpers/auth.js';
import {router} from '../../router.js';

import {makeTemplate} from './register-templates.js';

export class Register extends GWBWElement {
	constructor() {
		super();

		this.onRegister = this.onRegister.bind(this);

		this.setNamedSizes([
			{name: `huge`, width: 1}
		]);
		this.render();
	}

	connectedCallback() {
		super.connectedCallback();
	}

	disconnectedCallback() {
		if (this.$form) { this.$form.removeEventListener(`submit`, this.onRegister); }
		super.disconnectedCallback();
	}

	render() {
		if (this.$form) { this.$form.removeEventListener(`submit`, this.onRegister); }
		this.innerHTML = makeTemplate(this);
		this.$form = this.querySelector(`form`);
		this.$form.addEventListener(`submit`, this.onRegister);
	}

	async onRegister(event) {
		event.preventDefault();
		const registrationSuccessful = await Auth.register(this.$form);
		if (registrationSuccessful) {
			GA.event(`register`, `success`);
			router.navigate(`/watches`);
		} else {
			GA.event(`register`, `fail`);
			alert(`Registration failed. Try again?`);
		}
	}
}

customElements.define(`gwbw-register`, Register);
