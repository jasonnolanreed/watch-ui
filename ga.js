export class GA {
	constructor() {
		this.hasCreatedDefaultTracker = false;
	}

	static send(...options) {
		if (!(`ga` in window)) { return; }
		if (!this.hasCreatedDefaultTracker) {
			this.hasCreatedDefaultTracker = true;
			ga(`create`, `UA-136438475-1`, `auto`);
		}
		if (typeof ga.getAll !== `function`) { return; }
		const tracker = ga.getAll()[0];
		if (!tracker) { return; }
		tracker.send(...options);
	}
}

new GA();
// ga('send', 'event', 'Video (category)`, 'play (action)', 'cats.mp4 (label)');