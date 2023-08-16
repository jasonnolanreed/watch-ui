const makeHtml = (component) => (
`
<div class="page-title">
	<gwbw-icon name="settings"></gwbw-icon>
	<h1>Preferences</h1>
</div>

<div class="logged-in-box feature-box">
	<div>
		<b>Logged in as:</b>
		<div>${component.user.email}</div>
	</div>
	<button type="button" class="logout button negative" href="javascript:void(0);">
		<gwbw-icon name="logout"></gwbw-icon>
		Logout
	</button>
</div>

<div>
	<div class="page-title page-subtitle">
		<gwbw-icon name="account_circle"></gwbw-icon>
		<h2>Custom Positions</h2>
	</div>
	<a href="/#/custom-positions">Manage custom preferences</a>
</div>

<hr/>

<form>
	<div class="page-title page-subtitle">
		<gwbw-icon name="update"></gwbw-icon>
		<h2>Atomic Offset</h2>
	</div>
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
		<button type="submit" class="button--save-atomic-time button positive">
			<gwbw-icon name="save"></gwbw-icon>
			Save Atomic Offset
		</button>
	</div>
</form>

<hr/>

<form>
	<div class="page-title page-subtitle">
		<gwbw-icon name="precision_manufacturing"></gwbw-icon>
		<h2>Timegrapher Features</h2>
	</div>
	<p>Do you have a timing machine (timegrapher)? You can choose to show or hide timegrapher features.</p>
	<div class="form-input">
		<label class="check">
			<input type="checkbox" name="showTimegrapherFeatures" ${component.preferences.showTimegrapherFeatures ? `checked` : ``}>
			<div class="timegrapher-feature-label">
				Show timegrapher features
			</div>
		</label>
	</div>
	<div class="form-controls">
		<button type="submit" class="button--save-timegrapher button positive">
			<gwbw-icon name="save"></gwbw-icon>
			Save Feature
		</button>
	</div>
</form>

<hr/>

<form>
	<div class="page-title page-subtitle">
		<gwbw-icon name="lock"></gwbw-icon>
		<h2>Change Password</h2>
	</div>
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
		<button type="submit" class="button--change-password button positive">
			<gwbw-icon name="save"></gwbw-icon>
			Change Password
		</button>
	</div>
</form>
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.logged-in-box {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	gap: 1em;
	margin-bottom: 2.5em;
}

[name="showTimegrapherFeatures"] + div {
	font-weight: bold;
}
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
