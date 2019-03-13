const makeHtml = (component) => (
`
<h1>Register</h1>
<form>
	<div class="form-input">
		<label>Email</label>
		<input type="text" name="email" autocomplete="email">
	</div>
	<div class="form-input">
		<label>Password</label>
		<input type="password" name="password" autocomplete="new-password">
	</div>
	<div class="form-controls">
		<button type="submit">Register</button>
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
