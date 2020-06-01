import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Auth} from '../../api-helpers/auth.js';
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './verify-templates.js';

export class Verify extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
	}

	connectedCallback() {
		super.connectedCallback();
		this.email = router.params.email;
		this.verificationCode = router.params.verificationCode;
		this.render();
		this.verify(this.shadowRoot.querySelector(`form`));
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		super.render();
		this.shadowRoot.innerHTML = makeTemplate(this);
	}

	async verify($form) {
		const didVerify = await Auth.verify($form);
		if (didVerify) {
			GA.event(`verfy`, `verify success`);
			Sentry.captureMessage(`registration verify SUCCESS: ${getFormData($form).email}`);
			const messages = document.querySelector(`gwbw-messages`);
			if (messages) {
				messages.add({message: `Your email address has been verified. You may now log in`, type: `success`});
			}
			router.navigate(`/login`);
		} else {
			GA.event(`verfy`, `verify fail`);
			Sentry.captureMessage(`registration verify ERROR: ${getFormData($form).email}`);
			const messages = document.querySelector(`gwbw-messages`);
			if (messages) {
				messages.add({message: `Something went wrong. You may need to bother goodwatchbadwatch@gmail.com about this`, type: `error`});
			}
		}
	}
}

customElements.define(`gwbw-verify`, Verify);
