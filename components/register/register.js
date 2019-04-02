import {GA} from '../../ga.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Auth} from '../../api-helpers/auth.js';
import {router} from '../../router.js';

import {makeTemplate} from './register-templates.js';

export class Register extends GWBWElement {
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
		const registrationSuccessful = await Auth.register(target);
		this.stopWorking();
		if (registrationSuccessful) {
			GA.event(`register`, `register success`);
			router.navigate(`/pre-verify`);
		} else {
			GA.event(`register`, `register fail`);
			alert(`Registration failed. Try again?`);
		}
	}
}

customElements.define(`gwbw-register`, Register);
