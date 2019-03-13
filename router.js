import Navigo from './node_modules/navigo/lib/navigo.es.js';
import {LoadView} from './utilities/load-view.js';
import {Auth} from './api-helpers/auth.js';

export const router = new Navigo(null, true, `#`);
const $view = document.getElementById(`view`);
const layouts = {
	main: `/layouts/layout-main.html`
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
	LoadView.layout($view, layouts.main, `./views/register/register-view.html`);
})
.on(`/login`, (params, query) => {
	LoadView.layout($view, layouts.main, `./views/login/login-view.html`);
})
.on(`/watches`, async (params, query) => {
	if (await Auth.isLoggedIn()) {
		LoadView.layout($view, layouts.main, `/views/watches/watches-view.html`);
	} else {
		router.navigate(`/login`);
	}
})
.notFound((query) => {
	LoadView.layout($view, layouts.main, `./views/not-found/not-found-view.html`);
})
.resolve();
