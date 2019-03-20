import {getIconNameForPosition} from '../../utilities/position.js';

const makeHtml = (component) => (
`
<h1><i class="material-icons inline">attachment</i> Measure Details</h1>
<form>
	<div class="form-input">
		<label for="note">Note</label>
		<textarea name="note">${component.measure.note}</textarea>
	</div>
	<div class="form-input position">
		<label for="position">Position</label>
		<label class="check">
			<input type="radio" name="position" value="unspecified" ${(_ => component.measure.position === `unspecified` ? `checked` : ``)()}>
			<i class="material-icons">${getIconNameForPosition(`unspecified`)}</i> Unspecified
		</label>
		<label class="check">
			<input type="radio" name="position" value="worn" ${(_ => component.measure.position === `worn` ? `checked` : ``)()}>
			<i class="material-icons">${getIconNameForPosition(`worn`)}</i> Worn
		</label>
		<label class="check">
			<input type="radio" name="position" value="dialup" ${(_ => component.measure.position === `dialup` ? `checked` : ``)()}>
			<i class="material-icons">${getIconNameForPosition(`dialup`)}</i> Dial Up
		</label>
		<label class="check">
			<input type="radio" name="position" value="dialdown" ${(_ => component.measure.position === `dialdown` ? `checked` : ``)()}>
			<i class="material-icons">${getIconNameForPosition(`dialdown`)}</i> Dial Down
		</label>
		<label class="check">
			<input type="radio" name="position" value="crownup" ${(_ => component.measure.position === `crownup` ? `checked` : ``)()}>
			<i class="material-icons">${getIconNameForPosition(`crownup`)}</i> Crown Up
		</label>
		<label class="check">
			<input type="radio" name="position" value="crowndown" ${(_ => component.measure.position === `crowndown` ? `checked` : ``)()}>
			<i class="material-icons">${getIconNameForPosition(`crowndown`)}</i> Crown Down
		</label>
	</div>
	<div class="form-controls">
		<a href="#/watches/detail/${component.measure.watchId}" class="button negative">Cancel</a>
		<button type="submit" class="button positive">Save Updates</button>
	</div>
</form>
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

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