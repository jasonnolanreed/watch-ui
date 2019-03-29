export const apiHost =
	(location.hostname === `gwbwdevelop.com`) ? `http://api.gwbwdevelop.com:8001/` :
	(location.hostname === `jnr-gwbw-api-test.herokuapp.com`) ? `https://jnr-gwbw-api-test.herokuapp.com/` :
	`https://api.goodwatchbadwatch.com/`;

export const getOptionsForBasicGet = _ => ({
	credentials: `include`,
	mode: `cors`,
	headers: {
		'Accept': `application/json`,
		'Content-Type': `application/json`
	}
});

export const getOptionsForPost = (data) => {
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

export const getOptionsForPut = (data) => {
	let options = getOptionsForPost(data);
	options.method = `PUT`;
	return options;
};

export const getOptionsForDelete = (data) => {
	let options = getOptionsForPost(data);
	options.method = `DELETE`;
	return options;
};
