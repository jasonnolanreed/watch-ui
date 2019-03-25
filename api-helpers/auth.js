import {apiHost, getOptionsForPost, getOptionsForBasicGet} from '../utilities/network.js';
import {Atomic} from '../utilities/atomic.js';

export class Auth {
	constructor() {
		Auth.userData = null;
		Auth.isLoggedInCache = null;
	}

	get userData() { return `123`; }
	set userData(data) { return null; }

	// Always resolves, with boolean payload
	static isLoggedIn() {
		if (typeof Auth.isLoggedInCache === `boolean` && Auth.isLoggedInCache) {
			return Promise.resolve(true);
		} else {
			return new Promise((resolve, reject) => {
				fetch(`${apiHost}user`, getOptionsForBasicGet())
				.then(response => {
					if (response && response.ok) {
						Auth.userData = response;
						Auth.isLoggedInCache = true;
						resolve(true);
						return;
					}
					Auth.userData = null;
					Auth.isLoggedInCache = false;
					resolve(false);
				})
				.catch(_ => {
					Auth.userData = null;
					Auth.isLoggedInCache = null;
					resolve(false);
				});
			});
		}
	}

	// Always resolves, with boolean payload
	static login(data) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}login`, getOptionsForPost(data))
			.then(response => {
				if (response && response.ok) {
					Auth.userData = response;
					Auth.isLoggedInCache = true;
					resolve(true);
					return;
				}
				Auth.userData = null;
				Auth.isLoggedInCache = false;
				resolve(false);
			})
			.catch(_ => {
				Auth.userData = null;
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
			.then(response => {
				Auth.userData = null;
				Auth.isLoggedInCache = false;
				if (response && response.ok) {
					resolve(true);
					return;
				}
				resolve(false);
			})
			.catch(_ => {
				Auth.userData = null;
				Auth.isLoggedInCache = false;
				resolve(false);
			});
		});
	}

	// Always resolves, with boolean payload
	static register(data) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}user`, getOptionsForPost(data))
			.then(response => {
				if (response && response.ok) {
					Auth.userData = response;
					Auth.isLoggedInCache = true;
					resolve(true);
					return;
				}
				Auth.userData = null;
				Auth.isLoggedInCache = false;
				resolve(false);
			})
			.catch(_ => {
				Auth.userData = null;
				Auth.isLoggedInCache = false;
				resolve(false);
			});
		});
	}
}

new Auth();
