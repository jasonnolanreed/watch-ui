const makeHtml = (component) => (
`
<h1><i class="material-icons inline">attachment</i> Measure Details</h1>
<form>
	<div class="form-input">
		<textarea name="note">${component.measure.note}</textarea>
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
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
