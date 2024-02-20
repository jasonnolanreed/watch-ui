export const makeTemplate = (component) => (
`
<div class="page-title">
	<gwbw-icon name="account_box"></gwbw-icon>
	<h1>Register</h1>
</div>

<form novalidate>
	<div class="form-input">
		<label for="email">Email</label>
		<input type="text" id="email" name="email" autocomplete="email" maxlength="250">
	</div>
	<div class="form-input">
		<label for="password">Password</label>
		<input type="password" id="password" name="password" autocomplete="new-password" maxlength="250">
	</div>
	<div class="form-controls">
		<button type="submit" class="button positive">
			<gwbw-icon name="account_box"></gwbw-icon>
			Register
		</button>
	</div>
</form>
<hr/>
<a href="#/login">Already have an account? Login here.</a>
`
);
