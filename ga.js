export class GA {
	constructor() {
		GA.view = GA.view.bind(this);
		this.hasCreatedDefaultTracker = false;
		this.storedViews = [];
	}

	static view(...options) {
		if (!(`ga` in window)) {
			this.storedViews.push(options);
			return;
		}
		if (!this.hasCreatedDefaultTracker) {
			this.hasCreatedDefaultTracker = true;
			ga(`create`, `UA-136438475-1`, `auto`);
		}
		if (typeof ga.getAll !== `function`) {
			this.storedViews.push(options);
			return;
		}
		const tracker = ga.getAll()[0];
		if (!tracker) {
			this.storedViews.push(options);
			return;
		}
		this.storedViews.forEach(options => ga(`set`, `page`, ...options));
		this.storedViews = [];
		ga(`set`, `page`, ...options);
		ga(`send`, `pageview`);
	}
}

new GA();
// ga('send', 'event', 'Video (category)`, 'play (action)', 'cats.mp4 (label)');