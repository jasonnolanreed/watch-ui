const makeHtml = (component) => (
`
<h1><i class="material-icons inline">settings</i> Edit Watch</h1>
<form>
	<div class="form-controls">
		<div class="form-input">
			<label for="name">Name</label>
			<input type="text" name="name" maxlength="200" value="${component.watch.name}">
		</div>
		<div class="form-input">
			<label for="goodTolerance">"Good" Tolerance</label>
			<input type="number" name="goodTolerance" maxlength="200" value="${component.watch.goodTolerance}">
			<small>Goal accuracy in +/- seconds per day</small>
		</div>
		<div class="form-input">
			<label for="note">Note</label>
			<textarea name="note" maxlength="500">${component.watch.note}</textarea>
		</div>
		<div class="form-controls">
			<a class="button negative" href="#/watches">Cancel</a>
			<button type="submit" class="button positive">Save Watch</button>
		</div>
	</div>
	<input type="hidden" name="watchId" value="${component.watch._id}">
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
