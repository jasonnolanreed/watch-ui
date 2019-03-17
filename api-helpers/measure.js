import {apiHost, getOptionsForPost, getOptionsForBasicGet, getOptionsForDelete} from '../utilities/network.js';

export class Measure {
	// Always resolves, with boolean payload
	static getMeasures(watchId) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}measure/${watchId}`, getOptionsForBasicGet())
			.then(response => response.json())
			.then(response => resolve(response))
			.catch(_ => resolve([]));
		});
	}

	// Always resolves, with boolean payload
	static addMeasure(data) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}measure`, getOptionsForPost(data))
			.then(response => {
				if (response && response.ok) {
					resolve(true);
				}
				resolve(false);
			})
			.catch(_ => resolve(false));
		});
	}

	// Always resolves, with boolean payload
	static removeMeasure(data) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}measure`, getOptionsForDelete(data))
			.then(response => {
				if (response && response.ok) {
					resolve(true);
				}
				resolve(false);
			})
			.catch(_ => resolve(false));
		});
	}
}
