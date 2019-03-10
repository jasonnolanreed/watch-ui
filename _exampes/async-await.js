const test = async _ => {
	const message = await getMessage();
	console.log(`message: ${message}`);
};

const getMessage = _ => {
	return new Promise((resolve, reject) => {
		setTimeout(_ => {
			resolve(`awaited message!`);
		}, 1000);
	});
};

test();