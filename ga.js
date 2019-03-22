export class GA {
	static view(url) {
		ga(`set`, `page`, url);
		ga(`send`, `pageview`);
	}
}

new GA();
// ga('send', 'event', 'Video (category)`, 'play (action)', 'cats.mp4 (label)');