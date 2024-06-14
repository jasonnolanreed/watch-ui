import {GA} from '../../ga.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Messages} from '../messages/messages.js';
import {AuthApi} from '../../api-helpers/auth.js';
import {router} from '../../router.js';

import {makeTemplate} from './guide-templates.js';

export class Guide extends GWBWElement {
	isLoggedIn = false;

	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.setClickEvents([
			{target: `[scroll-target]`, handler: this.onClickTopic}
		]);
		this.onClickTopic = this.onClickTopic.bind(this);
	}

	async connectedCallback() {
		super.connectedCallback();
		if (await AuthApi.isLoggedIn()) {
			this.isLoggedIn = true;
		}
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

	onClickTopic(event: MouseEvent, target: HTMLElement) {
		try {
			const targetId = target.getAttribute(`scroll-target`);
			const $target = this.shadowRoot.querySelector(`[scroll-id=${targetId}]`);
			requestAnimationFrame(_ => {
				$target.scrollIntoView();
			});
		} catch(error) {}
	}
}

customElements.define(`gwbw-guide`, Guide);
