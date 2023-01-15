import {router} from '../../router.js';
import {GA} from '../../ga.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {AuthApi} from '../../api-helpers/auth.js';
import {PreferenceApi} from "../../api-helpers/preference.js";
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './preferences-templates.js';

export class Preferences extends GWBWElement {
	constructor() {
		super();
		this.setClickEvents([
			{target: `.logout`, handler: this.onLogout},
			{target: `.button--save-atomic-time`, handler: this.onSaveAtomicTime},
			{target: `.button--change-password`, handler: this.onChangePassword}
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
			this.innerHTML = makeTemplate(this);
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	async getData() {
		this.preferences = await PreferenceApi.getPreferences();
		this.user = AuthApi.userData;
		this.render();
	}

	async onLogout(event, target) {
		const didLogOut = await AuthApi.logout();
		if (didLogOut) {
			GA.event(`logout`, `logout success`);
		} else {
			GA.event(`logout`, `logout fail`);
		}
		router.navigate(`/`);
	}

	async onSaveAtomicTime(event, target) {
		event.preventDefault();
		const form = target.form;
		this.startWorking(form);
		const didSave = await PreferenceApi.updatePreferences(getFormData(form));
		const messages = document.querySelector(`gwbw-messages`);
		if (didSave) {
			GA.event(`preference`, `preference update success`);
			if (messages) {
				messages.add({message: `Your new atomic offset was saved.`, type: `success`});
			}
		} else {
			GA.event(`preference`, `preference update fail`);
			if (messages) {
				messages.add({message: `Failed to save new atomic offset. Try again?`, type: `error`});
			}
		}
		this.stopWorking(form);
	}

	async onChangePassword(event, target) {
		event.preventDefault();
		const messages = document.querySelector(`gwbw-messages`);
		const form = target.form;
		const {currentPassword, newPassword, confirmNewPassword} = target.form;
		if (!currentPassword.value || !newPassword.value || !confirmNewPassword.value) {
			messages.add({message: `Please complete all form fields`, type: `error`});
			return;
		}
		if (currentPassword.value === newPassword.value) {
			messages.add({message: `New password must be different than current password`, type: `error`});
			return;
		}
		if (newPassword.value !== confirmNewPassword.value) {
			messages.add({message: `New password values are different`, type: `error`});
			return;
		}
		this.startWorking(form);
		const didChange = await AuthApi.changePassword(form);
		if (didChange) {
			GA.event(`changepassword`, `changepassword update success`);
			if (messages) {
				messages.add({message: `Your password has been changed. Please log back in with new password`, type: `success`, persistent: true});
				const didLogOut = await AuthApi.logout();
				if (didLogOut) {
					GA.event(`pass change logout`, `pass change logout success`);
					router.navigate(`/`);
				} else {
					GA.event(`pass change logout`, `pass change logout fail`);
				}
			}
		} else {
			GA.event(`changepassword`, `changepassword update fail`);
			if (messages) {
				messages.add({message: `Failed to change password. Try again?`, type: `error`});
			}
		}
		this.stopWorking(form);
	}
}

customElements.define(`gwbw-preferences`, Preferences);
