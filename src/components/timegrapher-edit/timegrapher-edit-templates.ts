import {timegrapherPositions} from "../../utilities/timegrapher.js";

const makeHtml = (component) => (
`
<div class="page-title">
	<gwbw-icon name="precision_manufacturing"></gwbw-icon>
	<div>
		<h1>Edit Timegrapher Results</h1>
		<h3>${component.watch.name}</h3>
	</div>
</div>

<form>
	<input type="hidden" name="watchId" value="${component.watch._id}"/>
	<input type="hidden" name="moment" value="${component.timegrapherResults.moment}"/>
	${renderFields(component)}
	<br/>
	<div class="form-input">
		<label for="note">Note</label>
		<textarea name="note">${component.timegrapherResults.note}</textarea>
	</div>
	<div class="form-controls">
		<a href="javascript:history.back();" class="button negative">
			<gwbw-icon name="do_not_disturb"></gwbw-icon>
			Cancel
		</a>
		<button class="button positive" type="submit">
			<gwbw-icon name="save"></gwbw-icon>
			Save
		</button>
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
		html += `<input type="number" name="${position.id}Rate" maxlength="200" step="0.1" value="${component.timegrapherResults[position.id + 'Rate']}">`;
		html += `<small>Rate (s/d)</small>`;
		html += `</div>`;

		html += `<div class="form-input">`;
		html += `<input type="number" name="${position.id}Amplitude" maxlength="200" min="0" step="0.1" value="${component.timegrapherResults[position.id + 'Amplitude']}">`;
		html += `<small>Amplitude (&deg;)</small>`;
		html += `</div>`;

		html += `<div class="form-input">`;
		html += `<input type="number" name="${position.id}BeatError" maxlength="200" min=0" step="0.1" value="${component.timegrapherResults[position.id + 'BeatError']}">`;
		html += `<small>Beat Error (ms)</small>`;
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
