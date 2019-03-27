export const makeTemplate = (component) => (
`
<h1><i class="material-icons inline">account_box</i> Register</h1>
<form novalidate>
	<div class="form-input">
		<label>Email</label>
		<input type="text" name="email" autocomplete="email" maxlength="250">
	</div>
	<div class="form-input">
		<label>Password</label>
		<input type="password" name="password" autocomplete="new-password" maxlength="250">
	</div>
	<div class="form-controls">
		<button type="submit" class="button positive">Register</button>
	</div>
</form>
<hr>
<a href="#/login" data-navigo>Already have an account? Login here.</a>
`
);
