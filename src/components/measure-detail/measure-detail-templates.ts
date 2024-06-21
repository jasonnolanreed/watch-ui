import {Format} from '../../utilities/date-time.js';
import {positionsMap} from '../../utilities/position.js';
import {MeasureDetail} from './measure-detail.js';

const makeHtml = (component: MeasureDetail) => (
String.raw`
<div class="page-title">
	<gwbw-icon name="straighten"></gwbw-icon>
	<div>
		<h1>Measure Details</h1>
		<h2>${Format.dateAndTime(component.measure.targetMoment)}</h2>
	</div>
</div>

<form>
	<div class="form-input">
		<label class="check pointer">
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
		<button type="button" class="button negative-inverse cancel-button">
			<gwbw-icon name="do_not_disturb"></gwbw-icon>
			Cancel
		</button>
		<button type="submit" class="button positive">
			<gwbw-icon name="save"></gwbw-icon>
			Save Measure
		</button>
	</div>
	<br><br>
	<div class="feature-box">
		<h3>Delete measure</h3>
		<p>
			<gwbw-icon name="warning" color="bad"></gwbw-icon>
			<b class="color-bad">Warning:</b> deletion of this measure will not be reversible.
		</p>
		<button type="button" class="button negative delete-button" measure-id="${component.measure._id}">
			<gwbw-icon name="delete"></gwbw-icon>
			Delete Measure
		</button>
	</div>
</form>
`
);

const showPositionsRadios = (component: MeasureDetail) => {
	let html = ``;
	for (const customPosition of component.customPositions) {
		html +=
		String.raw`
		<label class="check">
			<input class="custom" type="radio" name="position" value="customid:${customPosition._id}" ${component.measure.customPositionId === customPosition._id ? `checked` : ``}>
			<gwbw-icon name="account_circle"></gwbw-icon> ${customPosition.name}
		</label>
		<br/>
		`;
	}
	for (const position in positionsMap) {
		html +=
		String.raw`
		<label class="check">
			<input type="radio" name="position" value="${position}" ${component.measure.position === position ? `checked` : ``}>
			<gwbw-icon name="${positionsMap[position].icon}"></gwbw-icon> ${positionsMap[position].label}
		</label>
		<br/>
		`;
	}
	html += String.raw`
	<br/>
	<a href="/#/custom-positions">Manage custom positions</a>
	<br/>
	`;
	return html;
};

const makeHiddenFields = (component: MeasureDetail) => {
	if (component.mode !== `add`) { return ``; }
	return String.raw`
	<input type="hidden" name="watchId" value="${component.measure.watchId}">
	<input type="hidden" name="targetMoment" value="${component.measure.targetMoment}">
	<input type="hidden" name="moment" value="${component.measure.moment}">
	`;
}

const makeCss = (component: MeasureDetail) => (
String.raw`
<style>
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

export const makeTemplate = (component: MeasureDetail) => {
	return makeCss(component) + makeHtml(component);
};
