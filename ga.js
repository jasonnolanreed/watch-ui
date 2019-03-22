export class GA {
	constructor() {
		GA.send = GA.send.bind(this);
		this.hasCreatedDefaultTracker = false;
		this.storedSends = [];
	}

	static send(...options) {
		if (!(`ga` in window)) {
			this.storedSends.push(options);
			return;
		}
		if (!this.hasCreatedDefaultTracker) {
			this.hasCreatedDefaultTracker = true;
			ga(`create`, `UA-136438475-1`, `auto`);
		}
		if (typeof ga.getAll !== `function`) {
			this.storedSends.push(options);
			return;
		}
		const tracker = ga.getAll()[0];
		if (!tracker) {
			this.storedSends.push(options);
			return;
		}
		if (this.storedSends.length) {
			this.storedSends.forEach(options => tracker.send(...options));
			this.storedSends = [];
		}
		tracker.send(...options);
	}
}

new GA();
// ga('send', 'event', 'Video (category)`, 'play (action)', 'cats.mp4 (label)');