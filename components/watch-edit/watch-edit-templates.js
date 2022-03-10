const makeHtml = (component) => (
`
<h1><gwbw-icon name="settings"></gwbw-icon> Edit Watch</h1>
<form>
	<div class="form-input">
		<label for="name">Name</label>
		<input type="text" id="name" name="name" maxlength="200" value="${component.watch.name}">
	</div>
	<div class="form-input">
		<label for="goodTolerancePlus">"Good" Tolerance, Fast</label>
		<input type="number" id="goodTolerancePlus" name="goodTolerancePlus" maxlength="200" value="${component.watch.goodTolerancePlus}" min="0">
		<small>Goal accuracy in seconds fast per day</small>
	</div>
	<div class="form-input">
		<label for="goodToleranceMinus">"Good" Tolerance, Slow</label>
		<input type="number" id="goodToleranceMinus" name="goodToleranceMinus" maxlength="200" value="${component.watch.goodToleranceMinus}" min="0">
		<small>Goal accuracy in seconds slow per day</small>
	</div>
	<div class="form-input">
		<label for="note">Note</label>
		<textarea id="note" name="note" maxlength="500">${component.watch.note}</textarea>
	</div>
	<div class="form-controls">
		<a class="button negative" href="#/watches">Cancel</a>
		<button type="submit" class="button positive">Save Watch</button>
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
