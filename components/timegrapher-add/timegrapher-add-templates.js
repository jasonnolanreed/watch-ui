import {timegrapherPositions} from "../../utilities/timgrapher.js";

const makeHtml = (component) => (
`
<div class="page-title">
	<gwbw-icon name="mic_external_on"></gwbw-icon>
	<div>
		<h1>Add Timegrapher Results</h1>
		<h3>${component.watch.name}</h3>
	</div>
</div>

<form>
	${renderFields(component)}

	<div class="form-controls">
		<a href="javascript:alert('todo -- return to timegrapher')" class="button negative">Cancel</a>
		<button class="button positive" type="submit">Save</button>
	</div>
</form>
`
);

const renderFields = component => {
	let html = ``;
	const positions = timegrapherPositions;
	positions.forEach(position => {
		html += `<label>${position.label}</label>`;
		html += `<div class="form-input--three-wide">`;

		html += `<div class="form-input">`;
		html += `<input type="number" name="${position.id}Rate" maxlength="200" value="" step="0.1">`;
		html += `<small>Rate</small>`;
		html += `</div>`;
		
		html += `<div class="form-input">`;
		html += `<input type="number" name="${position.id}Beat Error" maxlength="200" value="" min=0" step="0.1">`;
		html += `<small>Beat Error</small>`;
		html += `</div>`;
		
		html += `<div class="form-input">`;
		html += `<input type="number" name="${position.id}Amplitude" maxlength="200" value="" min="0" step="0.1">`;
		html += `<small>Amplitude</small>`;
		html += `</div>`;

		html += `</div>`;
	});
	return html;
};

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.form-input {
	margin-bottom: 0.75rem;
}
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
