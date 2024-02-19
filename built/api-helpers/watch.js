import { apiHost, getOptionsForPost, getOptionsForBasicGet, getOptionsForDelete, getOptionsForPut } from '../utilities/network.js';
import { LoggedOutApi } from './logged-out.js';
export class WatchApi {
    // Always resolves, with boolean payload
    static getWatches() {
        return new Promise((resolve, reject) => {
            fetch(`${apiHost}watch`, getOptionsForBasicGet())
                .then(response => LoggedOutApi.checkLoggedOut(response))
                .then(response => { if (response.ok) {
                return response.json();
            } throw new Error(); }, error => { throw new Error(); })
                .then(response => resolve(response))
                .catch(_ => resolve([]));
        });
    }
    // Always resolves, with boolean payload
    static getWatch(watchId) {
        return new Promise((resolve, reject) => {
            fetch(`${apiHost}watch/${watchId}`, getOptionsForBasicGet())
                .then(response => LoggedOutApi.checkLoggedOut(response))
                .then(response => { if (response.ok) {
                return response.json();
            } throw new Error(); }, error => { throw new Error(); })
                .then(response => resolve(response))
                .catch(_ => resolve(null));
        });
    }
    // Always resolves, with boolean payload
    static add(data) {
        return new Promise((resolve, reject) => {
            fetch(`${apiHost}watch`, getOptionsForPost(data))
                .then(response => LoggedOutApi.checkLoggedOut(response))
                .then(response => { if (response.ok) {
                return response.json();
            } throw new Error(); }, error => { throw new Error(); })
                .then(response => resolve(true))
                .catch(_ => resolve(false));
        });
    }
    // Always resolves, with boolean payload
    static delete(data) {
        return new Promise((resolve, reject) => {
            fetch(`${apiHost}watch`, getOptionsForDelete(data))
                .then(response => LoggedOutApi.checkLoggedOut(response))
                .then(response => { if (response.ok) {
                return response.json();
            } throw new Error(); }, error => { throw new Error(); })
                .then(response => resolve(true))
                .catch(_ => resolve(false));
        });
    }
    // Always resolves, with boolean payload
    static update(data) {
        return new Promise((resolve, reject) => {
            fetch(`${apiHost}watch`, getOptionsForPut(data))
                .then(response => LoggedOutApi.checkLoggedOut(response))
                .then(response => { if (response.ok) {
                return response.json();
            } throw new Error(); }, error => { throw new Error(); })
                .then(response => resolve(true))
                .catch(_ => resolve(false));
        });
    }
}
