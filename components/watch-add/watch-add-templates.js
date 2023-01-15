const makeHtml = (component) => (
`
<h1><gwbw-icon name="watch"></gwbw-icon> Add a Watch</h1>
<form>
	<div class="form-input">
		<label for="name">Name</label>
		<input type="text" id="name" name="name" maxlength="200">
	</div>
	<div class="form-input--two-wide">
		<div class="form-input">
			<label for="goodToleranceMinus">"Good" Tolerance, Slow</label>
			<input type="number" id="goodToleranceMinus" name="goodToleranceMinus" maxlength="200" value="10" min="0" step="0.001">
			<small>Goal accuracy in seconds slow per day</small>
		</div>
		<div class="form-input">
			<label for="goodTolerancePlus">"Good" Tolerance, Fast</label>
			<input type="number" id="goodTolerancePlus" name="goodTolerancePlus" maxlength="200" value="20" min="0" step="0.001">
			<small>Goal accuracy in seconds fast per day</small>
		</div>
	</div>
	<div class="form-input">
		<label for="note">Note</label>
		<textarea id="note" name="note" maxlength="500"></textarea>
	</div>
	<div class="form-controls">
		<a class="button negative" href="#/watches">Cancel</a>
		<button type="submit" class="button positive">Add Watch</button>
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
