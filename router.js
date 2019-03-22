import Navigo from './vendor/navigo.js';
import {LoadView} from './utilities/load-view.js';
import {Auth} from './api-helpers/auth.js';

export const router = new Navigo(null, true, `#`);
const $view = document.getElementById(`view`);
const layouts = {
	main: `layouts/layout-main.html`
};

if (!(`ga` in window)) { window.ga = () => null; }

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
	ga(`set`, `page`, `/register`, `Register`);
	ga(`send`, `pageview`);
})
.on(`/login`, (params, query) => {
	LoadView.layout($view, layouts.main, `views/login/login-view.html`);
	ga(`set`, `page`, `/login`, `Login`);
	ga(`send`, `pageview`);
})
.on(`/watches`, async (params, query) => {
	if (await Auth.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/watches/watches-view.html`);
		ga(`set`, `page`, `/watches`, `Watches`);
		ga(`send`, `pageview`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/watches/add`, async (params, query) => {
	if (await Auth.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/watch-add/watch-add-view.html`);
		ga(`set`, `page`, `/watches/add`, `Add a Watch`);
		ga(`send`, `pageview`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/watches/detail/:watchId`, async (params, query) => {
	router.params = params;
	if (await Auth.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/watch-detail/watch-detail-view.html`);
		ga(`set`, `page`, `/watches/detail`, `Watch Details`);
		ga(`send`, `pageview`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/watches/measure/:watchId`, async (params, query) => {
	router.params = params;
	if (await Auth.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/watch-measure/watch-measure-view.html`);
		ga(`set`, `page`, `/watches/measure`, `Measure a Watch`);
		ga(`send`, `pageview`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/measure/:measureId`, async (params, query) => {
	router.params = params;
	if (await Auth.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/measure-detail/measure-detail-view.html`);
		ga(`set`, `page`, `/measure`, `Measure Details`);
		ga(`send`, `pageview`);
	} else {
		router.navigate(`/login`);
	}
})
.on(`/measure/now/:watchId/:targetMoment/:moment/:firstOfSet`, async (params, query) => {
	router.params = params;
	if (await Auth.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `views/measure-detail/measure-detail-view.html`);
		ga(`set`, `page`, `/measure/now`, `Save New Measure`);
		ga(`send`, `pageview`);
	} else {
		router.navigate(`/login`);
	}
})
.notFound((query) => {
	LoadView.layout($view, layouts.main, `views/not-found/not-found-view.html`);
	ga(`set`, `page`, `/notfound`, `Page Not Found`);
	ga(`send`, `pageview`);
})
.resolve();
