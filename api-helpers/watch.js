import {apiHost, getOptionsForPost, getOptionsForBasicGet, getOptionsForDelete} from '../utilities/network.js';

export class Watch {
	// Always resolves, with boolean payload
	static getWatches() {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}watch`, getOptionsForBasicGet())
			.then(response => response.json())
			.then(response => {
				resolve(response);
			})
			.catch(_ => {
				resolve([]);
			});
		});
	}

	// Always resolves, with boolean payload
	static getWatch(watchId) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}watch/${watchId}`, getOptionsForBasicGet())
			.then(response => response.json())
			.then(response => {
				resolve(response);
			})
			.catch(_ => {
				resolve([]);
			});
		});
	}

	// Always resolves, with boolean payload
	static add(data) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}watch`, getOptionsForPost(data))
			.then(response => {
				if (response && response.ok) {
					resolve(true);
				}
				resolve(false);
			})
			.catch(_ => {
				resolve(false);
			});
		});
	}

	// Always resolves, with boolean payload
	static delete(data) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}watch`, getOptionsForDelete(data))
			.then(response => {
				if (response && response.ok) {
					resolve(true);
				}
				resolve(false);
			})
			.catch(_ => {
				resolve(false);
			});
		});
	}
}
