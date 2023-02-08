import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {WatchApi} from '../../api-helpers/watch.js';
import {TimegrapherApi} from '../../api-helpers/timegrapher.js';

import {makeTemplate} from './timegrapher-templates.js';

export class Timegrapher extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.setClickEvents([
			{target: `.previous-results`, handler: this.viewPreviousResults},
			{target: `.next-results`, handler: this.viewNextResults},
		]);
	}

	connectedCallback() {
		super.connectedCallback();
		this.getData();
	}

	disconnectedCallback() {
		if (this.stickyObserver) { this.stickyObserver.disconnect(); }
		super.disconnectedCallback();
	}

	getData() {
		Promise.all([
			WatchApi.getWatch(router.params[`watchId`]),
			TimegrapherApi.getTimegrapherResults(router.params[`watchId`]),
		])
		.then(responses => {
			this.watch = responses[0];
			this.timegrapherResults = responses[1];
			this.currentResultsIndex = this.timegrapherResults.length - 1;
			if (router.query && router.query.resultsIndex && router.query.resultsIndex > -1 && router.query.resultsIndex < this.timegrapherResults.length) {
				this.currentResultsIndex = +router.query.resultsIndex;
			}
			this.currentResults = this.timegrapherResults[this.currentResultsIndex];
			this.render();
		})
		.catch(error => null);
	}

	render() {
		super.render();
		try {
			this.shadowRoot.innerHTML = makeTemplate(this);
			this.detectSticky();
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	viewPreviousResults(event, target) {
		router.navigate(`/timegrapher/${router.params['watchId']}/?resultsIndex=${this.currentResultsIndex - 1}`);
	}

	viewNextResults(event, target) {
		router.navigate(`/timegrapher/${router.params['watchId']}/?resultsIndex=${this.currentResultsIndex + 1}`);
	}

	detectSticky() {
		if (this.stickyObserver) { this.stickyObserver.disconnect(); }

		this.stickyObserver = new IntersectionObserver(
			([e]) => e.target.toggleAttribute('stuck', e.intersectionRatio < 1),
			{threshold: [0]}
		);
		
		this.stickyObserver.observe(this.shadowRoot.querySelector(`.sticky-controls-outer`));
	}
}

customElements.define(`gwbw-timegrapher`, Timegrapher);
