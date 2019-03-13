import {NamedSizeElement} from '../../classes/named-size.js';
import {getFormData} from '../../utilities/form.js';
import {Auth} from '../../api-helpers/auth.js';
import {router} from '../../router.js';

import {makeTemplate} from './register-templates.js';

export class Register extends NamedSizeElement {
	constructor() {
		super();

		this.render = this.render.bind(this);
		this.onRegister = this.onRegister.bind(this);

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
		if (this.$form) { this.$form.removeEventListener(`submit`, this.onRegister); }
	}

	render() {
		if (this.$form) { this.$form.removeEventListener(`submit`, this.onRegister); }
		this.shadowRoot.innerHTML = makeTemplate(this);
		this.$form = this.shadowRoot.querySelector(`form`);
		this.$form.addEventListener(`submit`, this.onRegister);
	}

	async onRegister(event) {
		event.preventDefault();
		const registrationSuccessful = await Auth.register(getFormData(this.$form));
		if (registrationSuccessful) {
			router.navigate(`/watches`);
		} else {
			alert(`Registration failed. Try again?`);
		}
	}
}

customElements.define(`gwbw-register`, Register);
