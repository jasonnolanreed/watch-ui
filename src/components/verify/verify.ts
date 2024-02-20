import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Messages} from '../messages/messages.js';
import {AuthApi} from '../../api-helpers/auth.js';
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './verify-templates.js';

declare const Sentry: any;

export class Verify extends GWBWElement {
	email: string;
	verificationCode: string;

	constructor() {
		super();
		this.attachShadow({mode: `open`});
	}

	connectedCallback() {
		super.connectedCallback();
		this.email = router[`params`][`email`];
		this.verificationCode = router[`params`][`verificationCode`];
		this.render();
		this.verify(this.shadowRoot.querySelector(`form`));
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		super.render();
		try {
			this.shadowRoot.innerHTML = makeTemplate(this);
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	async verify($form) {
		const didVerify = await AuthApi.verify($form);
		if (didVerify) {
			try {
				Sentry.captureMessage(`registration verify SUCCESS: ${getFormData($form).email}`);
				GA.event(`verfy`, `verify success`);
			} catch(error) {}
			const messages: Messages = document.querySelector(`gwbw-messages`);
			if (messages) {
				messages.add({message: `Your email address has been verified. You may now log in`, type: `success`, persistent: true});
			}
			router.navigate(`/login`);
		} else {
			try {
				GA.event(`verfy`, `verify fail`);
				Sentry.captureMessage(`registration verify ERROR: ${getFormData($form).email}`);
			} catch(error) {}
			const messages: Messages = document.querySelector(`gwbw-messages`);
			if (messages) {
				messages.add({message: `Something went wrong. You may need to bother goodwatchbadwatch@gmail.com about this`, type: `error`});
			}
		}
	}
}

customElements.define(`gwbw-verify`, Verify);
