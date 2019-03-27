import {apiHost, getOptionsForPost, getOptionsForBasicGet, getOptionsForDelete} from '../utilities/network.js';
import {LoggedOut} from './logged-out.js';

export class Watch {
	// Always resolves, with boolean payload
	static getWatches() {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}watch`, getOptionsForBasicGet())
			.then(response => LoggedOut.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(response))
			.catch(_ => resolve([]));
		});
	}

	// Always resolves, with boolean payload
	static getWatch(watchId) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}watch/${watchId}`, getOptionsForBasicGet())
			.then(response => LoggedOut.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(response))
			.catch(_ => resolve([]));
		});
	}

	// Always resolves, with boolean payload
	static add(data) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}watch`, getOptionsForPost(data))
			.then(response => LoggedOut.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}

	// Always resolves, with boolean payload
	static delete(data) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}watch`, getOptionsForDelete(data))
			.then(response => LoggedOut.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}
}
