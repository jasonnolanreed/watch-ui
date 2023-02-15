const makeHtml = (component) => (
`
<div class="page-title">
	<gwbw-icon name="watch"></gwbw-icon>
	<h1>Watches</h1>
</div>

${showSortControls(component)}
<form>
	${listWatches(component)}
	<div class="form-controls">
		<a href="#/watches/add" class="big-link">Add New Watch</a>
	</div>
</form>
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.sort-controls { display: flex; justify-content: flex-end; align-items: center; gap: 10px; margin-bottom: 2em; color: var(--blue); }
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
		<li class="list-item spacious" watch-id="${watch._id}">
			<a class="watch-link" href="#/watches/${watch._id}">${watch.name}</a>
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

const showSortControls = component => {
	if (!component.watches || component.watches.length < 2) {
		return ``;
	}

	return `
	<div class="sort-controls">
		<label>Sort:</label>
		<div class="toggle-buttons">
			<button type="button" class="created ${component.preferences.watchesSort.includes('created') ? 'selected' : ''}">
				Added
				<gwbw-icon
					name="${component.preferences.watchesSort.includes('Asc') ? 'expand_more' : 'expand_less'}"
					class="${component.preferences.watchesSort.includes('created') ? '' : 'hidden'}"
				></gwbw-icon>
			</button>
			<button type="button" class="measured ${component.preferences.watchesSort.includes('measured') ? 'selected' : ''}">
				Last Measured
				<gwbw-icon
					name="${component.preferences.watchesSort.includes('Asc') ? 'expand_more' : 'expand_less'}"
					class="${component.preferences.watchesSort.includes('measured') ? '' : 'hidden'}"
				></gwbw-icon>
			</button>
			<button type="button" class="name ${component.preferences.watchesSort.includes('name') ? 'selected' : ''}">
				Name
				<gwbw-icon
					name="${component.preferences.watchesSort.includes('Asc') ? 'expand_more' : 'expand_less'}"
					class="${component.preferences.watchesSort.includes('name') ? '' : 'hidden'}"
				></gwbw-icon>
			</button>
		</div>
	</div>
	`;
};

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
