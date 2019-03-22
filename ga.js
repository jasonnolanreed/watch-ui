export class GA {
	constructor() {
		GA.view = GA.view.bind(this);
		this.hasCreatedDefaultTracker = false;
		this.storedViews = [];
	}

	static view(url) {
		if (!(`ga` in window)) {
			this.storedViews.push(url);
			return;
		}
		if (!this.hasCreatedDefaultTracker) {
			this.hasCreatedDefaultTracker = true;
			ga(`create`, `UA-136438475-1`, `auto`);
		}
		this.storedViews.forEach(url => ga(`set`, `page`, url));
		this.storedViews = [];
		ga(`set`, `page`, url);
		ga(`send`, `pageview`);
	}
}

new GA();
// ga('send', 'event', 'Video (category)`, 'play (action)', 'cats.mp4 (label)');