export const measurementId = `UA-136438475-2`;

declare const gtag: any;

export class GA {
	static view(url, name) {
		return;
		gtag(`config`, measurementId, {page_path: url, page_name: name});
	}

	static event(category, action, label?) {
		return;
		let data: any = {event_category: category};
		if (label) { data.label = label; }
		gtag(`event`, action, data);
	}
}

// new GA();
