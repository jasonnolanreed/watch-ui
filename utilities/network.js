export const apiHost =
	(location.hostname === `localhost`) ? `http://localhost:8001/` :
	(location.hostname === `jnr-gwbw-api-test.herokuapp.com`) ? `https://jnr-gwbw-api-test.herokuapp.com/` :
	`https://jnr-gwbw-api-prod.herokuapp.com/`;

export const getOptionsForBasicGet = _ => ({
	credentials: `include`,
	headers: {
		'Content-Type': `application/json`
	}
});

export const getOptionsForPost = (data) => {
	return {
		method: `POST`,
		body: JSON.stringify(data),
		credentials: `include`,
		headers: {
			// 'Accept': `application/json`,
			'Content-Type': `application/json`
		}
	};
};

export const getOptionsForDelete = (data) => {
	let options = getOptionsForPost(data);
	options.method = `DELETE`;
	return options;
};
