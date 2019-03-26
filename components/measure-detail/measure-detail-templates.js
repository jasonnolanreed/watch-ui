import {getIconNameForPosition} from '../../utilities/position.js';

const makeHtml = (component) => (
`
<h1><i class="material-icons inline">attachment</i> Measure Details</h1>
<div class="more-info">
	<h1><i class="invisible material-icons inline">attachment</i></h1>
	${' '}<h3>${moment(+component.measure.targetMoment).format('MMM Do, hh:mm a')}</h3>
</div>
<form>
	<div class="form-input">
		<label class="check">
			<input type="checkbox" name="firstOfSet" ${component.measure.firstOfSet ? `checked` : ``}>
			<div>First measure of session<br><small>(first since having set time on watch)</small></div>
		</label>
	</div>
	<hr>
	<div class="form-input">
		<label for="note">Note</label>
		<textarea name="note">${component.measure.note}</textarea>
	</div>
	<div class="form-input position">
		<label for="position">Position</label>
		<label class="check">
			<input type="radio" name="position" value="unspecified" ${component.measure.position === `unspecified` ? `checked` : ``}>
			<i class="material-icons">${getIconNameForPosition(`unspecified`)}</i> Unspecified
		</label>
		<label class="check">
			<input type="radio" name="position" value="worn" ${component.measure.position === `worn` ? `checked` : ``}>
			<i class="material-icons">${getIconNameForPosition(`worn`)}</i> Worn
		</label>
		<label class="check">
			<input type="radio" name="position" value="dialup" ${component.measure.position === `dialup` ? `checked` : ``}>
			<i class="material-icons">${getIconNameForPosition(`dialup`)}</i> Dial Up
		</label>
		<label class="check">
			<input type="radio" name="position" value="dialdown" ${component.measure.position === `dialdown` ? `checked` : ``}>
			<i class="material-icons">${getIconNameForPosition(`dialdown`)}</i> Dial Down
		</label>
		<label class="check">
			<input type="radio" name="position" value="crownup" ${component.measure.position === `crownup` ? `checked` : ``}>
			<i class="material-icons">${getIconNameForPosition(`crownup`)}</i> Crown Up
		</label>
		<label class="check">
			<input type="radio" name="position" value="crowndown" ${component.measure.position === `crowndown` ? `checked` : ``}>
			<i class="material-icons">${getIconNameForPosition(`crowndown`)}</i> Crown Down
		</label>
		<label class="check">
			<input type="radio" name="position" value="winder" ${component.measure.position === `winder` ? `checked` : ``}>
			<i class="material-icons">${getIconNameForPosition(`winder`)}</i> Winder
		</label>
	</div>
	${makeHiddenFields(component)}
	<div class="form-controls">
		<button type="button" class="button negative cancel">Cancel</button>
		<button type="submit" class="button positive">Save Measure</button>
	</div>
</form>
`
);

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

.more-info { margin: -2.5em 0 2em; }
.more-info h1 { display: inline; }
.more-info h3 { display: inline; }
.position i {
	font-size: 2.2em;
	margin-right: 0.2em;
}
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
