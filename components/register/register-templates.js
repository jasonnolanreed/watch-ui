const makeHtml = (component) => (
`
<h1>Register</h1>
<form novalidate>
	<div class="form-input">
		<label>Email</label>
		<input type="text" name="email" autocomplete="email">
	</div>
	<div class="form-input">
		<label>Password</label>
		<input type="password" name="password" autocomplete="new-password">
	</div>
	<div class="form-controls">
		<button type="submit" class="button positive">Register</button>
	</div>
</form>
<hr>
<a href="#/login" data-navigo>Already have an account? Login here.</a>
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
