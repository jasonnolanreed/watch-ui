const makeHtml = (component) => (
`
<h1>Watches</h1>
${listWatches(component)}
<div class="form-controls">
	<a class="button" href="#/watches/add">Add a Watch</a>
</div>
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";
</style>
`
);

const listWatches = component => {
	if (!component.watches || !component.watches.length) {
		return `<p>You don't have any watches yet.</p>`;
	}
	let htmlString = `<ul class="list">`;
	for (const watch of component.watches) {
		htmlString += `
		<li class="list-item">
			<div>${watch.name}</div>
			<div class="nowrap">
				<button class="view-watch button compact" watch-id="${watch._id}">
					<i class="material-icons">timeline</i>
				</button>
				<button class="delete-watch button negative compact" watch-id="${watch._id}">
					<i class="material-icons">delete</i>
				</button>
			</div>
		</li>
		`;
	}
	htmlString += `</ul>`;
	return htmlString;
};

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
