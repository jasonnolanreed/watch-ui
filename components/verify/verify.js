import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Auth} from '../../api-helpers/auth.js';

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
		this.shadowRoot.innerHTML = makeTemplate(this);
	}

	async verify($form) {
		const didVerify = await Auth.verify($form);
		if (didVerify) {
			GA.event(`verfy`, `verify success`);
			alert(`Your email address has been verified. You may now log in`);
			router.navigate(`/login`);
		} else {
			GA.event(`verfy`, `verify fail`);
			alert(`Something went wrong. You may need to bother goodwatchbadwatch@gmail.com about this`);
		}
	}
}

customElements.define(`gwbw-verify`, Verify);
