import { apiHost, getOptionsForBasicGet, getOptionsForPut } from '../utilities/network.js';
import { LoggedOutApi } from './logged-out.js';
export class PreferenceApi {
    static getPreferences() {
        return new Promise((resolve, reject) => {
            fetch(`${apiHost}preference`, getOptionsForBasicGet())
                .then(response => LoggedOutApi.checkLoggedOut(response))
                .then(response => { if (response.ok) {
                return response.json();
            } throw new Error(); }, error => { throw new Error(); })
                .then(response => resolve(response))
                .catch(_ => resolve({}));
        });
    }
    static updatePreferences(data) {
        return new Promise((resolve, reject) => {
            fetch(`${apiHost}preference`, getOptionsForPut(data))
                .then(response => LoggedOutApi.checkLoggedOut(response))
                .then(response => { if (response.ok) {
                return response.json();
            } throw new Error(); }, error => { throw new Error(); })
                .then(response => resolve(true))
                .catch(_ => resolve(false));
        });
    }
}
