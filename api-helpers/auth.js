import {apiHost, getOptionsForPost, getOptionsForBasicGet} from '../utilities/network.js';

export class Auth {
	constructor() {
		this.isLoggedInCache = null;
	}

	get isLoggedInCache() { return this.isLoggedInCache; }
	set isLoggedInCache(newValue) {
		if (typeof newValue === `boolean`) { this.isLoggedInCache = newValue; }
	}

	// Always resolves, with boolean payload
	static isLoggedIn() {
		if (typeof this.isLoggedInCache === `boolean` && this.isLoggedInCache) {
			return Promise.resolve(true);
		} else {
			return new Promise((resolve, reject) => {
				fetch(`${apiHost}watch`, getOptionsForBasicGet())
				.then(response => {
					if (response && response.ok) {
						this.isLoggedInCache = true;
						resolve(true);
					}
					this.isLoggedInCache = false;
					resolve(false);
				})
				.catch(_ => {
					this.isLoggedInCache = null;
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
					this.isLoggedInCache = true;
					resolve(true);
				}
				this.isLoggedInCache = false;
				resolve(false);
			})
			.catch(_ => {
				this.isLoggedInCache = false;
				resolve(false)
			});
		});
	}

	// Always resolves, with boolean payload
	static register(data) {
		// TODO -- set isLoggedInCache
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}user`, getOptionsForPost(data))
			.then(response => {
				if (response && response.ok) {
					this.isLoggedInCache = true;
					resolve(true);
				}
				this.isLoggedInCache = false;
				resolve(false);
			})
			.catch(_ => {
				this.isLoggedInCache = false;
				resolve(false)
			});
		});
	}
}

new Auth();
