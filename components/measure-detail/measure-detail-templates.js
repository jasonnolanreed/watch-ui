import {Format} from '../../utilities/date-time.js';
import {positionsMap} from '../../utilities/position.js';

const makeHtml = (component) => (
`
<div class="page-title">
	<gwbw-icon name="straighten"></gwbw-icon>
	<div>
		<h1>Measure Details</h1>
		<h3>${Format.dateAndTime(component.measure.targetMoment)}</h3>
	</div>
</div>

<form>
	<div class="form-input">
		<label class="check">
			<input type="checkbox" name="firstOfSession" ${component.measure.firstOfSession ? `checked` : ``}>
			<div>First measure of session<br/><small>(first since having set time on watch)</small></div>
		</label>
	</div>
	<hr/>
	<div class="form-input">
		<label for="note">Note</label>
		<textarea id="note" name="note" maxlength="500">${component.measure.note}</textarea>
	</div>
	<div class="form-input position">
		<label for="position">Position</label>
		<small class="position-helper">Choose the most prevalent position since the last measure</small>
		${showPositionsRadios(component)}
	</div>
	${makeHiddenFields(component)}
	<div class="form-controls">
		<button type="button" class="button negative cancel-button">
			<gwbw-icon name="do_not_disturb"></gwbw-icon>
			Cancel
		</button>
		<button type="submit" class="button positive">
			<gwbw-icon name="save"></gwbw-icon>
			Save Measure
		</button>
	</div>
</form>
`
);

const showPositionsRadios = component => {
	let html = ``;
	for (const position in positionsMap) {
		html +=
		`
		<label class="check">
			<input type="radio" name="position" value=${position} ${component.measure.position === position ? `checked` : ``}>
			<gwbw-icon name="${positionsMap[position].icon}"></gwbw-icon> ${positionsMap[position].label}
		</label>
		<br/>
		`;
	}
	return html;
};

const makeHiddenFields = component => {
	if (component.mode !== `add`) { return ``; }
	return `
	<input type="hidden" name="watchId" value="${component.measure.watchId}">
	<input type="hidden" name="targetMoment" value="${component.measure.targetMoment}">
	<input type="hidden" name="moment" value="${component.measure.moment}">
	`;
}

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.page-title gwbw-icon {
	transform: rotate(90deg);
}

.position gwbw-icon {
	font-size: 2.2em;
	margin-right: 0.2em;
}
.position-helper { display: block; margin: -0.25em 0 0.5em; }
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
