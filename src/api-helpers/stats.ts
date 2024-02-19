import {apiHost, getOptionsForBasicGet} from '../utilities/network.js';
import {LoggedOutApi} from './logged-out.js';

export class StatsApi {
	// Always resolves, with boolean payload
	static getStats() {
		return new Promise<Stats>((resolve, reject) => {
			fetch(`${apiHost}stats`, getOptionsForBasicGet())
			.then(response => LoggedOutApi.checkLoggedOut(response))
			.then(response => { if (response.ok) { return response.json(); } throw new Error(); }, error => { throw new Error(); })
			.then(response => resolve(response))
			.catch(_ => resolve(null));
		});
	}
}

export interface Stats {
	watchesCount: number;
	measuresCount: number;
	timegrapherResultsCount: number;
	usersCount: number;
	preusersCount: number;
	latestMeasures: {
		date: string;
		watch: string;
		watchId: string;
		user: string;
	}[];
	// TODO
	latestTimegrapherResults: [];
}
