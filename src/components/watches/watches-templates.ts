import {Watches} from "./watches";

const makeHtml = (component: Watches) => (
String.raw`
<div class="page-title">
	<gwbw-icon name="watch"></gwbw-icon>
	<h1>Watches</h1>
</div>

${showSortControls(component)}
<form>
	${listWatches(component)}
	<div class="form-controls">
		<a href="#/watches/add" class="big-link positive">
			<gwbw-icon name="add_circle"></gwbw-icon>
			<span>Add New Watch</span>
		</a>
	</div>
</form>
`
);

const makeCss = (component: Watches) => (
String.raw`
<style>
.sort-controls { display: flex; justify-content: flex-end; align-items: center; gap: 10px; margin-bottom: 2em; }
.list-item { gap: 25px; cursor: default; }
.watch-link { justify-content: flex-start !important; min-width: 60px; }
.controls { display: flex; align-items: center; gap: 0.4rem; }
</style>
`
);

const listWatches = (component: Watches) => {
	if (!component.watches || !component.watches.length) {
		return `<p>You don't have any watches yet.</p>`;
	}
	let htmlString = `<ul class="list">`;
	for (const watch of component.watches) {
		htmlString += String.raw`
		<li class="list-item spacious" watch-id="${watch._id}">
			<div class="watch-name expand">
				<a class="watch-link link-button expand" href="#/watches/${watch._id}">
					<gwbw-icon name="watch"></gwbw-icon>
					<span>${watch.name}</span>
				</a>
			</div>
			<div class="controls nowrap">
				<a
					href="#/watches/edit/${watch._id}"
					class="button neutral compact"
				>
					<gwbw-icon name="tune"></gwbw-icon>
					<span>Edit</span>
				</a>
			</div>
		</li>
		`;
	}
	htmlString += `</ul>`;
	return htmlString;
};

const showSortControls = (component: Watches) => {
	if (!component.watches || component.watches.length < 2) {
		return ``;
	}

	return String.raw`
	<div class="sort-controls">
		<label><b>Sort:</b></label>
		<nav class="toggle-buttons" aria-label="Sort watches">
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
		</nav>
	</div>
	`;
};

export const makeTemplate = (component: Watches) => {
	return makeCss(component) + makeHtml(component);
};
