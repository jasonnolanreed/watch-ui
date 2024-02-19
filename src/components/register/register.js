import {GA} from '../../ga.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {AuthApi} from '../../api-helpers/auth.js';
import {router} from '../../router.js';
import {getFormData} from '../../utilities/form.js';

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
		try {
			this.innerHTML = makeTemplate(this);
			this.querySelector(`input#email`)?.focus();
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	async onSubmit(event, target) {
		this.startWorking();
		const registrationSuccessful = await AuthApi.register(target);
		this.stopWorking();
		if (registrationSuccessful) {
			try {
				Sentry.captureMessage(`registration attempt SUCCESS: ${getFormData(target).email}`);
			} catch(error) {}
			GA.event(`register`, `register success`);
			router.navigate(`/pre-verify`);
		} else {
			GA.event(`register`, `register fail`);
			try {
				Sentry.captureMessage(`registration attempt ERROR: ${getFormData(target).email}`);
			} catch(error) {}
			const messages = document.querySelector(`gwbw-messages`);
			if (messages) {
				messages.add({message: `Registration failed. Try again?`, type: `error`});
			}
		}
	}
}

customElements.define(`gwbw-register`, Register);
