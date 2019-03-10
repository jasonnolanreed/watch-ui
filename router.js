import Navigo from './node_modules/navigo/lib/navigo.es.js';
import {LoadView} from './classes/load-view.js';

import HomeView from './views/home/home-view.js';
import WatchesView from './views/watches/watches-view.js';
import NotFoundView from './views/not-found/not-found-view.js';

const $view = document.getElementById(`view`);
const router = new Navigo(null, true, `#`);

router
.on((query) => {
	LoadView.load($view, HomeView);
})
.on(`/watches`, (params, query) => {
	LoadView.load($view, WatchesView);
})
.notFound((query) => {
	LoadView.load($view, NotFoundView);
})
.resolve();
