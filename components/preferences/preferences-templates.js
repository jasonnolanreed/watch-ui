const makeHtml = (component) => (
`
<h1><gwbw-icon name="settings"></gwbw-icon> Preferences</h1>

<form>
	<div class="form-input">
		<label for="atomicOffset">Atomic Offset</label>
		<input type="number" name="atomicOffset" step="any" value="${component.preferences.atomicOffset}"/>
		<small>
			Amount of time, in seconds, your device differs from atomic time.
			For example, if <a href="https://time.is" target="time.is" rel="noreferrer">time.is</a> reports your device is 2.4 seconds behind (slow), you will enter -2.4 here.
			For best results, you should update this value at least daily.
		</small>
	</div>
	<div class="form-controls">
		<button type="submit" class="button positive">Save Preferences</button>
	</div>
</form>

<hr/>
<a class="logout big-link" href="javascript:void(0);">Logout</a>
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
