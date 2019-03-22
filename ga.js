const measurementId = `UA-136438475-2`;

gtag(`js`, new Date());
gtag(`config`, measurementId);

export class GA {
	static view(url) {
		console.log(`setting view: ${url}`);
		gtag(`config`, measurementId, {page_path: url});
		gtag(`event`, 'page_view', {send_to: measurementId});
	}
}

new GA();

/*
gtag('event', 'play', {
	'event_category': 'Videos',
	'event_label': 'Fall Campaign'
});
*/