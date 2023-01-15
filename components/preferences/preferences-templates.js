const makeHtml = (component) => (
`
<h1><gwbw-icon name="settings"></gwbw-icon> Preferences</h1>

<b>Logged in as:</b>
<p>${component.user.email}</p>

<button type="button" class="logout button" href="javascript:void(0);">Logout</button>
<hr>

<form>
	<h2>Atomic Offset</h2>
	<div class="form-input">
		<label for="atomicOffset">Offset</label>
		<input type="number" id="atomicOffset" name="atomicOffset" step="any" value="${component.preferences.atomicOffset}"/>
		<small>
			Amount of time, in seconds, your device differs from atomic time.
			For example, if <a href="https://time.is" target="time.is" rel="noreferrer">time.is</a> reports your device is 2.4 seconds behind (slow), you will enter -2.4 here.
			For best results, you should update this value at least daily.
		</small>
	</div>
	<div class="form-controls">
		<button type="submit" class="button--save-atomic-time button positive">Save Atomic Offset</button>
	</div>
</form>

<hr>

<form>
	<h2>Change Password</h2>
	<div class="form-input">
		<label for="currentPassword">Current Password</label>
		<input type="password" id="currentPassword" name="currentPassword"/>
	</div>
	<div class="form-input">
		<label for="newPassword">New Password</label>
		<input type="password" id="newPassword" name="newPassword"/>
	</div>
	<div class="form-input">
		<label for="confirmNewPassword">Confirm New Password</label>
		<input type="password" id="confirmNewPassword" name="confirmNewPassword"/>
	</div>
	<div class="form-controls">
		<button type="submit" class="button--change-password button positive">Change Password</button>
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
