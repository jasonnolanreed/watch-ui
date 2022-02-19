import Navigo from './vendor/navigo.js';
import {LoadView} from './utilities/load-view.js';
import {GA} from './ga.js';
import {AuthApi} from './api-helpers/auth.js';

export const router = new Navigo(null, true, `#`);
const $view = document.getElementById(`view`);
const layouts = {
	main: `layouts/layout-main.html`,
	test: `layouts/layout-test.html`
};

// Set hash of original request. If request is to auth-restricted view,
// and user isn't logged in, they will be forwarded to this hash after login.
AuthApi.preAuthHash = window.location.hash.replace(`#`, ``);

router
.on(async (query) => {
	if (await AuthApi.isLoggedIn()) {
		router.navigate(`/watches`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/test`, (params, query) => {
	LoadView.layout($view, layouts.test);
})
.on(`/register`, (params, query) => {
	LoadView.layout($view, layouts.main, `views/register-view.html`);
	GA.view(`/register`, `Register`);
})
.on(`/pre-verify`, (params, query) => {
	LoadView.layout($view, layouts.main, `views/pre-verify-view.html`);
	GA.view(`/pre-verify`, `Pre-Verify`);
})
.on(`/verify/:email/:verificationCode`, (params, query) => {
	router.params = params;
	LoadView.layout($view, layouts.main, `views/verify-view.html`);
	GA.view(`/verify`, `Verify`);
})
.on(`/login`, (params, query) => {
	LoadView.layout($view, layouts.main, `views/login-view.html`);
	GA.view(`/login`, `Login`);
})
.on(`/preferences`, async (params, query) => {
	if (await AuthApi.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/preferences.html`);
		GA.view(`/preferences`, `Preferences`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/watches`, async (params, query) => {
	if (await AuthApi.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/watches-view.html`);
		GA.view(`/watches`, `Watches`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/watches/add`, async (params, query) => {
	if (await AuthApi.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/watch-add-view.html`);
		GA.view(`/watches/add`, `Add a Watch`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/watches/detail/:watchId`, async (params, query) => {
	router.params = params;
	router.query = formatQuery(query);
	if (await AuthApi.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/watch-detail-view.html`);
		GA.view(`/watches/detail`, `Watch Details`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/watches/edit/:watchId`, async (params, query) => {
	router.params = params;
	router.query = formatQuery(query);
	if (await AuthApi.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/watch-edit-view.html`);
		GA.view(`/watches/edit`, `Edit a Watch`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/watches/measure/:watchId`, async (params, query) => {
	router.params = params;
	if (await AuthApi.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/watch-measure-view.html`);
		GA.view(`/watches/measure`, `Measure a Watch`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/measure/:measureId`, async (params, query) => {
	router.params = params;
	if (await AuthApi.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/measure-detail-view.html`);
		GA.view(`/measure`, `Measure Details`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/measure/now/:watchId/:targetMoment/:moment/:firstOfSession`, async (params, query) => {
	router.params = params;
	if (await AuthApi.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/measure-detail-view.html`);
		GA.view(`/measure/now`, `Save New Measure`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/measure/interval/:measureOne/:measureTwo`, async (params, query) => {
	router.params = params;
	if (await AuthApi.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/measure-interval-view.html`);
		GA.view(`/measure/interval`, `Measure Interval`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/stats`, async (params, query) => {
	if (await AuthApi.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/stats-view.html`);
	} else {
		router.navigate(`/login`);
	}
})
.notFound((query) => {
	LoadView.layout($view, layouts.main, `views/not-found-view.html`);
	GA.view(`/notfound`, `Page Not Found`);
})
.resolve();

function formatQuery(queryString) {
	if (!queryString) { return; }
	const queries = queryString.split(`&`);
	let queryObject = {};
	queries.forEach(query => {
		const splitQuery = query.split(`=`);
		queryObject[splitQuery[0]] = splitQuery[1];
	});
	return queryObject;
}
