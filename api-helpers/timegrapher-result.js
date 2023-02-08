import {apiHost, getOptionsForPost, getOptionsForBasicGet, getOptionsForDelete, getOptionsForPut} from '../utilities/network.js';
import {LoggedOutApi} from './logged-out.js';

export class TimegrapherResultApi {
	// Always resolves, with boolean payload
	static getTimegrapherResults(watchId) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}timegrapher-result/watch/${watchId}`, getOptionsForBasicGet())
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(response))
			.catch(_ => resolve([]));
		});
	}

	// Always resolves, with boolean payload
	static getMeasure(measureId) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}measure/${measureId}`, getOptionsForBasicGet())
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(response))
			.catch(_ => resolve([]));
		});
	}

	// Always resolves, with boolean payload
	static getMeasuresByRange(watchId, startMeasureId, endMeasureId) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}measure/watch/${watchId}/range/${startMeasureId}/${endMeasureId}`, getOptionsForBasicGet())
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(response))
			.catch(_ => resolve([]));
		});
	}

	// Always resolves, with boolean payload
	static addMeasure(data) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}measure`, getOptionsForPost(data))
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}

	// Always resolves, with boolean payload
	static updateMeasure(measureId, data) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}measure/${measureId}`, getOptionsForPut(data))
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}

	// Always resolves, with boolean payload
	static removeMeasure(data) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}measure`, getOptionsForDelete(data))
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}
}
