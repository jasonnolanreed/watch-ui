const makeHtml = (component) => (
`
<h1><i class="material-icons inline">exit_to_app</i> Login</h1>
<form novalidate>
	<div class="form-input">
		<label>Email</label>
		<input type="text" name="email" autocomplete="email">
	</div>
	<div class="form-input">
		<label>Password</label>
		<input type="password" name="password" autocomplete="current-password">
	</div>
	<div class="form-controls">
		<button type="submit" class="button">Login</button>
	</div>
</form>
<hr>
<a href="#/register" data-navigo>Don't have an account yet? Register here.</a>
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
