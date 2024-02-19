import { apiHost, getOptionsForPost, getOptionsForBasicGet, getOptionsForDelete, getOptionsForPut } from '../utilities/network.js';
import { LoggedOutApi } from './logged-out.js';
export class TimegrapherApi {
    static getTimegrapherResults(watchId) {
        return new Promise((resolve, reject) => {
            fetch(`${apiHost}timegrapher-result/watch/${watchId}`, getOptionsForBasicGet())
                .then(response => LoggedOutApi.checkLoggedOut(response))
                .then(response => { if (response.ok) {
                return response.json();
            } throw new Error(); }, error => { throw new Error(); })
                .then(response => resolve(response))
                .catch(_ => resolve([]));
        });
    }
    static getTimegrapherResultsById(timegrapherResultsId) {
        return new Promise((resolve, reject) => {
            fetch(`${apiHost}timegrapher-result/${timegrapherResultsId}`, getOptionsForBasicGet())
                .then(response => LoggedOutApi.checkLoggedOut(response))
                .then(response => { if (response.ok) {
                return response.json();
            } throw new Error(); }, error => { throw new Error(); })
                .then(response => resolve(response))
                .catch(_ => resolve(null));
        });
    }
    static add(data) {
        return new Promise((resolve, reject) => {
            fetch(`${apiHost}timegrapher-result/`, getOptionsForPost(data))
                .then(response => LoggedOutApi.checkLoggedOut(response))
                .then(response => { if (response.ok) {
                return response.json();
            } throw new Error(); }, error => { throw new Error(); })
                .then(response => resolve(true))
                .catch(_ => resolve(false));
        });
    }
    static delete(resultsId) {
        return new Promise((resolve, reject) => {
            fetch(`${apiHost}timegrapher-result/${resultsId}`, getOptionsForDelete({}))
                .then(response => LoggedOutApi.checkLoggedOut(response))
                .then(response => { if (response.ok) {
                return response.json();
            } throw new Error(); }, error => { throw new Error(); })
                .then(response => resolve(true))
                .catch(_ => resolve(false));
        });
    }
    static update(resultsId, data) {
        return new Promise((resolve, reject) => {
            fetch(`${apiHost}timegrapher-result/${resultsId}`, getOptionsForPut(data))
                .then(response => LoggedOutApi.checkLoggedOut(response))
                .then(response => { if (response.ok) {
                return response.json();
            } throw new Error(); }, error => { throw new Error(); })
                .then(response => resolve(true))
                .catch(_ => resolve(false));
        });
    }
}
