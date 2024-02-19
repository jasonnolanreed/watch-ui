import {apiHost, getOptionsForBasicGet, getOptionsForDelete, getOptionsForPost, getOptionsForPut} from '../utilities/network.js';
import {LoggedOutApi} from './logged-out.js';

export class CustomPositionsApi {
	static addPosition(data) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}custom-position/`, getOptionsForPost(data))
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}

	static getCustomPositions() {
		return new Promise<CustomPosition[]>((resolve, reject) => {
			fetch(`${apiHost}custom-position`, getOptionsForBasicGet())
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(response || []))
			.catch(_ => resolve([]));
		});
	}

	static updateCustomPosition(customPositionId, data) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}custom-position/${customPositionId}`, getOptionsForPut(data))
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}

	static deleteCustomPosition(customPositionId, data) {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}custom-position/${customPositionId}`, getOptionsForDelete(data))
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}
}

export interface CustomPosition {
	_id: string;
	userId: string;
	name: string;
}
