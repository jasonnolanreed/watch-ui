import {apiHost, getOptionsForPost, getOptionsForBasicGet} from '../utilities/network.js';
import {Atomic} from '../utilities/atomic.js';
import {getFormData} from '../utilities/form.js';

export class Auth {
	constructor() {
		Auth.cachedUserData = null;
		Auth.isLoggedInCache = null;
	}

	static get userData() { return Auth.cachedUserData; }
	static set userData(data) { return null; }

	// Always resolves, with boolean payload
	static isLoggedIn() {
		if (typeof Auth.isLoggedInCache === `boolean` && Auth.isLoggedInCache) {
			return Promise.resolve(true);
		} else {
			return new Promise((resolve, reject) => {
				fetch(`${apiHost}user`, getOptionsForBasicGet())
				.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
				.then(response => {
					Auth.cachedUserData = response;
					Auth.isLoggedInCache = true;
					resolve(true);
				})
				.catch(_ => {
					Auth.cachedUserData = null;
					Auth.isLoggedInCache = null;
					resolve(false);
				});
			});
		}
	}

	// Always resolves, with boolean payload
	static login($form) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}login`, getOptionsForPost(getFormData($form)))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => {
				resolve(true);
			})
			.catch(_ => {
				Auth.cachedUserData = null;
				Auth.isLoggedInCache = false;
				resolve(false);
			});
		});
	}

	// Always resolves, with boolean payload
	static logout() {
		Atomic.clearAtomicOffset();
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}logout`, getOptionsForBasicGet())
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => {
				Auth.cachedUserData = null;
				Auth.isLoggedInCache = false;
				resolve(true);
			})
			.catch(_ => {
				Auth.cachedUserData = null;
				Auth.isLoggedInCache = false;
				resolve(false);
			});
		});
	}

	// Always resolves, with boolean payload
	static register($form) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}user`, getOptionsForPost(getFormData($form)))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => {
				Auth.cachedUserData = response;
				Auth.isLoggedInCache = true;
				resolve(true);
			})
			.catch(_ => {
				Auth.cachedUserData = null;
				Auth.isLoggedInCache = false;
				resolve(false);
			});
		});
	}
}

new Auth();
