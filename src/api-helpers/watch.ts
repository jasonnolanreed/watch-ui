import {Watch} from '../types/api-data.js';
import {apiHost, getOptionsForPost, getOptionsForBasicGet, getOptionsForDelete, getOptionsForPut} from '../utilities/network.js';
import {LoggedOutApi} from './logged-out.js';

export class WatchApi {
	static getWatches(): Promise<Watch[]> {
		return new Promise<Watch[]>((resolve, reject) => {
			fetch(`${apiHost}watch`, getOptionsForBasicGet())
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(response))
			.catch(_ => resolve([]));
		});
	}

	static getWatch(watchId): Promise<Watch> {
		return new Promise<Watch>((resolve, reject) => {
			fetch(`${apiHost}watch/${watchId}`, getOptionsForBasicGet())
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(response))
			.catch(_ => resolve(null));
		});
	}

	static add(data): Promise<boolean> {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}watch`, getOptionsForPost(data))
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}

	static delete(data): Promise<boolean> {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}watch`, getOptionsForDelete(data))
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}

	static update(data): Promise<boolean> {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}watch`, getOptionsForPut(data))
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}
}
