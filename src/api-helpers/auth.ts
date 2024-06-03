import {UserData} from '../types/api-data.js';
import {apiHost, getOptionsForPost, getOptionsForPut, getOptionsForBasicGet} from '../utilities/network.js';
import {getFormData} from '../utilities/form.js';

export class AuthApi {
	static cachedUserData: UserData = null;
	static isLoggedInCache = null;
	static preAuthRequestHash = null;

	constructor() {}

	static get userData() { return AuthApi.cachedUserData; }
	static set userData(data) {}
	static get preAuthHash() { return AuthApi.preAuthRequestHash; }
	static set preAuthHash(hash) { AuthApi.preAuthRequestHash = hash; }

	static isLoggedIn(): Promise<boolean> {
		if (AuthApi.isLoggedInCache !== null && AuthApi.isLoggedInCache) {
			return Promise.resolve(true);
		} else {
			return new Promise((resolve, reject) => {
				fetch(`${apiHost}user`, getOptionsForBasicGet())
				.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
				.then(response => {
					AuthApi.cachedUserData = response;
					AuthApi.isLoggedInCache = true;
					resolve(true);
				})
				.catch(_ => {
					AuthApi.cachedUserData = null;
					AuthApi.isLoggedInCache = null;
					resolve(false);
				});
			});
		}
	}

	static login($form: HTMLFormElement): Promise<boolean> {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}login`, getOptionsForPost(getFormData($form)))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => {
				resolve(true);
			})
			.catch(_ => {
				AuthApi.cachedUserData = null;
				AuthApi.isLoggedInCache = false;
				resolve(false);
			});
		});
	}

	static logout(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}logout`, getOptionsForBasicGet())
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => {
				AuthApi.cachedUserData = null;
				AuthApi.isLoggedInCache = false;
				resolve(true);
			})
			.catch(_ => {
				AuthApi.cachedUserData = null;
				AuthApi.isLoggedInCache = false;
				resolve(false);
			});
		});
	}

	static register($form: HTMLFormElement): Promise<boolean> {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}user`, getOptionsForPost(getFormData($form)))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}

	static verify($form: HTMLFormElement): Promise<boolean> {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}verify`, getOptionsForPost(getFormData($form)))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}

	static changePassword($form: HTMLFormElement): Promise<boolean> {
		return new Promise((resolve, reject) => {
			fetch(`${apiHost}change-password`, getOptionsForPut(getFormData($form)))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(true))
			.catch(_ => resolve(false));
		});
	}
}

new AuthApi();
