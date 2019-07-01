export const makeTemplate = (component) => (
`
<h1><gwbw-icon name="exit_to_app"></gwbw-icon> Login</h1>
<form novalidate>
	<div class="form-input">
		<label for="email">Email</label>
		<input type="text" name="email" autocomplete="email" maxlength="250">
	</div>
	<div class="form-input">
		<label for="password">Password</label>
		<input type="password" name="password" autocomplete="current-password" maxlength="250">
	</div>
	<div class="form-controls">
		<button type="submit" class="button">Login</button>
	</div>
</form>
<hr>
<a href="#/register">Don't have an account yet? Register here.</a>
`
);
