import {router} from '../../router.js';
import {GA} from '../../ga.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Auth} from '../../api-helpers/auth.js';
import {PreferenceApi} from "../../api-helpers/preference.js";
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './preferences-templates.js';

export class Preferences extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.bindShadowForm();
		this.setClickEvents([
			{target: `.logout`, handler: this.onLogout}
		]);
	}

	async connectedCallback() {
		super.connectedCallback();
		this.getData();
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

	getData() {
		PreferenceApi.getPreferences()
		.then(preferences => {
			this.preferences = preferences;
			this.render();
		})
		.catch(error => null)
	}

	async onSubmit(event, target) {
		this.startWorking();
		const didSave = await PreferenceApi.updatePreferences(getFormData(target));
		const messages = document.querySelector(`gwbw-messages`);
		if (didSave) {
			GA.event(`preference`, `preference update success`);
			if (messages) {
				messages.add({message: `Your preferences have been saved.`, type: `success`});
			}
		} else {
			GA.event(`preference`, `preference update fail`);
			if (messages) {
				messages.add({message: `Failed to save preferences. Try again?`, type: `error`});
			}
		}
		this.stopWorking();
	}

	async onLogout(event, target) {
		const didLogOut = await Auth.logout();
		if (didLogOut) {
			GA.event(`logout`, `logout success`);
		} else {
			GA.event(`logout`, `logout fail`);
		}
		router.navigate(`/`);
	}
}

customElements.define(`gwbw-preferences`, Preferences);
