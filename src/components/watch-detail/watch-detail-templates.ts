import {WatchDetail} from "./watch-detail";

const makeHtml = (component: WatchDetail) => (
String.raw`
<div class="page-title">
	<gwbw-icon name="watch"></gwbw-icon>
	<div>
		<h1>Watch Details</h1>
		<h2>${component.watch.name}</h2>
	</div>
</div>

<gwbw-watch-tabs
	watch="${encodeURI(JSON.stringify(component.watch))}"
	preferences="${encodeURI(JSON.stringify(component.preferences))}"
	selected="details"
></gwbw-watch-tabs>

<br><br>

<form>
	<div class="form-input--two-wide">
		<div class="form-input">
			<label>"Good" tolerance, slow</label>
			<div class="faux-input" disabled>${component.watch.goodToleranceMinus}</div>
		</div>
		<div class="form-input">
			<label>"Good" tolerance, fast</label>
			<div class="faux-input" disabled>${component.watch.goodTolerancePlus}</div>
		</div>
	</div>

	<div class="form-input">
		<label>Note</label>
		<div class="faux-input" disabled>${component.watch.note.split(`\n`).join(`<br>`)}</div>
	</div>

	<div class="form-controls">
		<a class="button positive-inverse" href="#/watches/edit/${component.watch._id}">
			<gwbw-icon name="tune"></gwbw-icon>
			Edit Watch
		</a>
	</div>
</form>
`
);

const makeCss = (component: WatchDetail) => (
String.raw`
`
);

export const makeTemplate = (component: WatchDetail) => {
	return makeCss(component) + makeHtml(component);
};
