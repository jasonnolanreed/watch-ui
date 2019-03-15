const makeHtml = (component) => (
`
<h1>Add a Watch</h1>
<form>
	<div class="form-controls">
		<div class="form-input">
			<label>Name</label>
			<input type="text" name="name">
		</div>
		<div class="form-controls">
			<a class="button negative" href="/#/watches">Cancel</a>
			<button type="submit" class="button positive">Add Watch</button>
		</div>
	</div>
</form>
`
);

const makeCss = (component) => (
`
<style>
@import "/styles/global-styles.css";
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
