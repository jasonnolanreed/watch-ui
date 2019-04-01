const makeHtml = (component) => (
`
<h1><i class="material-icons inline">watch</i> Watches</h1>
<form>
	${listWatches(component)}
	<div class="form-controls">
		<a class="big-link" href="#/watches/add">Add New Watch</a>
	</div>
</form>
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.list-item { cursor: default; }
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
		<li class="list-item" watch-id="${watch._id}">
			<div>${watch.name}</div>
			<div class="nowrap">
				<button class="edit-watch button compact low-priority" watch-id="${watch._id}">
					<i class="material-icons">settings</i>
				</button>
				<button class="view-watch button compact" watch-id="${watch._id}">
					<i class="material-icons">insert_chart</i>
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
