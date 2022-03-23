const makeHtml = (component) => (
`
<h1><gwbw-icon name="watch"></gwbw-icon> Watches</h1>
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
.watch-link { min-width: 60px; margin-right: 25px; }
.controls { display: flex; align-items: center; }
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
			<a class="watch-link" href="#/watches/detail/${watch._id}">${watch.name}</a>
			<div class="controls nowrap">
				<button class="edit-watch button ultra-compact" watch-id="${watch._id}">
					<gwbw-icon name="settings"></gwbw-icon>
				</button>
				<button class="delete-watch button negative ultra-compact" watch-id="${watch._id}">
					<gwbw-icon name="delete"></gwbw-icon>
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
