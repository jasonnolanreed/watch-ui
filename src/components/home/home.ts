import {GA} from '../../ga.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Messages} from '../messages/messages.js';
import {AuthApi} from '../../api-helpers/auth.js';
import {router} from '../../router.js';

import {makeTemplate} from './home-templates.js';

export class Home extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
	}

	connectedCallback() {
		super.connectedCallback();
		this.render();
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
}

customElements.define(`gwbw-home`, Home);
