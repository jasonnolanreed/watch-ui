import {Login} from "./login";

export const makeTemplate = (component: Login) => (
`
<div class="page-title">
	<gwbw-icon name="exit_to_app"></gwbw-icon>
	<h1>Login</h1>
</div>

<form novalidate>
	<div class="form-input">
		<label for="email">Email</label>
		<input type="text" id="email" name="email" autocomplete="email" maxlength="250">
	</div>
	<div class="form-input">
		<label for="password">Password</label>
		<input type="password" id="password" name="password" autocomplete="current-password" maxlength="250">
	</div>
	<div class="form-controls">
		<button type="submit" class="button positive-inverse">
			<gwbw-icon name="exit_to_app"></gwbw-icon>
			Login
		</button>
	</div>
</form>
<br/>
<a href="#/register">Don't have an account yet? Register here.</a>
`
);
