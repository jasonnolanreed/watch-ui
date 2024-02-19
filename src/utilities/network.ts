export const environment = (location.hostname === `gwbwdevelop.com`) ?
	`development` :
	`production`;

export const apiHost =
	(environment === `development`) ? `http://api.gwbwdevelop.com:8001/` :
	`https://api.goodwatchbadwatch.com/`;

export const getOptionsForBasicGet = (): RequestInit => ({
	credentials: `include`,
	mode: `cors`,
	headers: {
		'Accept': `application/json`,
		'Content-Type': `application/json`
	}
});

export const getOptionsForPost = (data): RequestInit => {
	return {
		method: `POST`,
		body: JSON.stringify(data),
		credentials: `include`,
		mode: `cors`,
		headers: {
			'Accept': `application/json`,
			'Content-Type': `application/json`
		}
	};
};

export const getOptionsForPut = (data): RequestInit => {
	let options = getOptionsForPost(data);
	options.method = `PUT`;
	return options;
};

export const getOptionsForDelete = (data): RequestInit => {
	let options = getOptionsForPost(data);
	options.method = `DELETE`;
	return options;
};
