import {Measure} from '../types/api-data.js';
import {apiHost, getOptionsForPost, getOptionsForBasicGet, getOptionsForDelete, getOptionsForPut} from '../utilities/network.js';
import {LoggedOutApi} from './logged-out.js';

export class MeasureApi {
	static getMeasures(watchId): Promise<Measure[]> {
		return new Promise<Measure[]>((resolve, reject) => {
			fetch(`${apiHost}measure/watch/${watchId}`, getOptionsForBasicGet())
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(response))
			.catch(_ => resolve([]));
		});
	}

	static getMeasure(measureId): Promise<Measure> {
		return new Promise<Measure>((resolve, reject) => {
			fetch(`${apiHost}measure/${measureId}`, getOptionsForBasicGet())
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(response))
			.catch(_ => resolve(null));
		});
	}

	static getMeasuresByRange(watchId, startMeasureId, endMeasureId): Promise<Measure[]> {
		return new Promise<Measure[]>((resolve, reject) => {
			fetch(`${apiHost}measure/watch/${watchId}/range/${startMeasureId}/${endMeasureId}`, getOptionsForBasicGet())
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(response))
			.catch(_ => resolve([]));
		});
	}

	static addMeasure(data): Promise<boolean> {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}measure`, getOptionsForPost(data))
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}

	static updateMeasure(measureId, data): Promise<boolean> {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}measure/${measureId}`, getOptionsForPut(data))
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}

	static removeMeasure(data): Promise<boolean> {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}measure`, getOptionsForDelete(data))
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}
}
