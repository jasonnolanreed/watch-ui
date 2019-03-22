import Navigo from './vendor/navigo.js';
import {LoadView} from './utilities/load-view.js';
import {GA} from './ga.js';
import {Auth} from './api-helpers/auth.js';

export const router = new Navigo(null, true, `#`);
const $view = document.getElementById(`view`);
const layouts = {
	main: `layouts/layout-main.html`
};

router
.on(async (query) => {
	if (await Auth.isLoggedIn()) {
		router.navigate(`/watches`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/register`, (params, query) => {
	LoadView.layout($view, layouts.main, `views/register/register-view.html`);
	GA.view(`/register`, `Register`);
})
.on(`/login`, (params, query) => {
	LoadView.layout($view, layouts.main, `views/login/login-view.html`);
	GA.view(`/login`, `Login`);
})
.on(`/watches`, async (params, query) => {
	if (await Auth.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/watches/watches-view.html`);
		GA.view(`/watches`, `Watches`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/watches/add`, async (params, query) => {
	if (await Auth.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/watch-add/watch-add-view.html`);
		GA.view(`/watches/add`, `Add a Watch`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/watches/detail/:watchId`, async (params, query) => {
	router.params = params;
	if (await Auth.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/watch-detail/watch-detail-view.html`);
		GA.view(`/watches/detail`, `Watch Details`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/watches/measure/:watchId`, async (params, query) => {
	router.params = params;
	if (await Auth.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/watch-measure/watch-measure-view.html`);
		GA.view(`/watches/measure`, `Measure a Watch`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/measure/:measureId`, async (params, query) => {
	router.params = params;
	if (await Auth.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/measure-detail/measure-detail-view.html`);
		GA.view(`/measure`, `Measure Details`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/measure/now/:watchId/:targetMoment/:moment/:firstOfSet`, async (params, query) => {
	router.params = params;
	if (await Auth.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/measure-detail/measure-detail-view.html`);
		GA.view(`/measure/now`, `Save New Measure`);
	} else {
		router.navigate(`/login`);
	}
})
.notFound((query) => {
	LoadView.layout($view, layouts.main, `views/not-found/not-found-view.html`);
	GA.view(`/notfound`, `Page Not Found`);
})
.resolve();
