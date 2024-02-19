import { apiHost, getOptionsForBasicGet } from '../utilities/network.js';
import { LoggedOutApi } from './logged-out.js';
export class StatsApi {
    // Always resolves, with boolean payload
    static getStats() {
        return new Promise((resolve, reject) => {
            fetch(`${apiHost}stats`, getOptionsForBasicGet())
                .then(response => LoggedOutApi.checkLoggedOut(response))
                .then(response => { if (response.ok) {
                return response.json();
            } throw new Error(); }, error => { throw new Error(); })
                .then(response => resolve(response))
                .catch(_ => resolve({}));
        });
    }
}
