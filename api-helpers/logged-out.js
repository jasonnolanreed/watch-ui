import {router} from '../router.js';
import {GA} from '../ga.js';
import {Auth} from './auth.js';

export class LoggedOut {
	static async checkLoggedOut(response) {
		if (response.status !== 401) { return response; }
		GA.event(`logout`, `timed out`);
		await Auth.logout();
		router.navigate(`/login`);
		// TODO -- messaging
		throw new Error();
	}
}