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
	<input type="hidden" name="watchId" value="${component.watch._id}"/>
	<input type="hidden" name="moment" value="${Date.now()}"/>
	${renderFields(component)}
	<div class="form-input">
		<label for="note">Note</label>
		<textarea name="note"></textarea>
	</div>
	<div class="form-controls">
		<a href="javascript:history.back();" class="button negative">Cancel</a>
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
		html += `<small>Rate (s/d)</small>`;
		html += `</div>`;
		
		html += `<div class="form-input">`;
		html += `<input type="number" name="${position.id}BeatError" maxlength="200" value="" min=0" step="0.1">`;
		html += `<small>Beat Error (ms)</small>`;
		html += `</div>`;

		html += `<div class="form-input">`;
		html += `<input type="number" name="${position.id}Amplitude" maxlength="200" value="" min="0" step="0.1">`;
		html += `<small>Amplitude (&deg;)</small>`;
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
