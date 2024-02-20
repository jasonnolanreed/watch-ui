import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Messages} from '../messages/messages.js';
import {WatchApi} from '../../api-helpers/watch.js';
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './watch-add-templates.js';

export class WatchAdd extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
	}

	connectedCallback() {
		super.connectedCallback();
		this.bindShadowForm();
		this.render();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		super.render();
		try {
			this.shadowRoot.innerHTML = makeTemplate(this);
			(this.shadowRoot.querySelector(`input#name`) as HTMLElement)?.focus();
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	async onSubmit(event, target) {
		this.startWorking();
		const addSuccessful = await WatchApi.add(getFormData(target));
		this.stopWorking();
		if (addSuccessful) {
			GA.event(`watch`, `watch add success`);
			router.navigate(`/watches`);
		} else {
			GA.event(`watch`, `watch add fail`);
			const messages: Messages = document.querySelector(`gwbw-messages`);
			if (messages) {
				messages.add({message: `Failed to add watch. Try again?`, type: `error`});
			}
		}
	}
}

customElements.define(`gwbw-watch-add`, WatchAdd);
