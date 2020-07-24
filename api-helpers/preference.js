import {apiHost, getOptionsForBasicGet, getOptionsForPut} from '../utilities/network.js';
import {LoggedOut} from './logged-out.js';

export class PreferenceApi {
	static getPreferences() {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}preference`, getOptionsForBasicGet())
			.then(response => LoggedOut.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(response))
			.catch(_ => resolve({}));
		});
	}

	static updatePreferences(data) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}preference`, getOptionsForPut(data))
			.then(response => LoggedOut.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}
}
