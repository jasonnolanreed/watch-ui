import {Format} from "../../utilities/date-time.js";

const makeHtml = (component) => (
`
<a class="back-link" href="#/watches/${component.watch._id}">
	<gwbw-icon name="arrow_back"></gwbw-icon><span>Back to watch</span>
</a>

<div class="page-title">
	<gwbw-icon name="mic_external_on"></gwbw-icon>
	<div>
		<h1>Timegrapher Results</h1>
		<h3>${component.watch.name}</h3>
	</div>
</div>

${component?.currentResults?.moment &&
`<h3>Results: ${Format.date(component.currentResults.moment)}</h3>`
||
``
}

${showResultsSelection(component)}

<gwbw-timegrapher-table timegrapherresults="${encodeURI(JSON.stringify(component.currentResults))}"></gwbw-timegrapher-table>

${component?.currentResults &&
`
<div class="form-controls">
	<button class="delete-button button negative" type="button">
		<gwbw-icon name="delete"></gwbw-icon>
		Delete
	</button>
	<a href="#/timegrapher/edit/${component.currentResults._id}" class="edit-button button" type="button">
		<gwbw-icon name="settings"></gwbw-icon>
		Edit
	</a>
</div>
`
||
``
}

${component?.currentResults?.note &&
`
<br/>
<div class="form-input">
	<label>Note</label>
	<div class="faux-input">${component.currentResults.note.split('\n').join('<br/>')}</div>
</div>
<br/>
`
||
``
}

<div class="sticky-controls-outer">
	<div class="sticky-controls">
		<div class="sticky-controls-inner">
			<a href="#/timegrapher/add/${component.watch._id}" class="big-link">Add New Results</a>
		</div>
	</div>
</div>

`
);

const showResultsSelection = component => {
	if (component.timegrapherResults.length < 2) { return ``; }
	return `
	<p class="results-selection form-controls">
		<button class="previous-results button compact low-priority" ${getPreviousDisabled(component)}><gwbw-icon name="arrow_back"></gwbw-icon></button>
		<button class="next-results button compact low-priority" ${getNextDisabled(component)}><gwbw-icon name="arrow_forward"></gwbw-icon></button>
		<small class="pages">(${component.currentResultsIndex + 1} of ${component.timegrapherResults.length})</small>
	</p>
	`;
};

const getPreviousDisabled = component => component.currentResultsIndex === 0 ? `disabled` : ``;
const getNextDisabled = component => component.currentResultsIndex === (component.timegrapherResults.length - 1) ? `disabled` : ``;

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.results-selection.results-selection { display: flex; align-items: center; margin: -0.5em 0 2em 0; }
.results-selection .pages { margin-left: 1em; }
.previous-results gwbw-icon, .next-results gwbw-icon { font-size: 1.4em; }
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
