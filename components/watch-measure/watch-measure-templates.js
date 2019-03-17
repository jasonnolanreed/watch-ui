const makeHtml = (component) => (
`
<h1>Measure ${component.watch.name}</h1>
<form>
	<p><em>Step 1)</em> Make sure this device has its time set accurately</p>
	<p><em>Step 2)</em> Set the time below to the time your watch is ABOUT to be</p>
	<div class="form-input target-time">
		<h1 class="target-time">${component.targetTimeString}</h1>
		<button type="button" class="button compact decrease-minute">
			<i class="material-icons">arrow_back</i>
			</button>
		<button type="button" class="button compact increase-minute">
			<i class="material-icons">arrow_forward</i>
		</button>
	</div>
	<p><em>Step 3)</em> Check the box if this is the first measure after having set your watch</p>
	<div class="form-input">
		<label class="wrap"><input type="checkbox" name="firstOfSet"> Start new session</label>
	</div>
	<p><em>Step 4)</em> Hit the "Now!" button at the exact moment your watch matches the above time</p>
	<div class="form-controls">
		<a href="#/watches/detail/${component.watch._id}" class="button negative">Cancel</a>
		<button type="button" class="button positive now">Now!</button>
	</div>
</form>
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.target-time {
	display: flex;
	align-items: center;
}

.target-time h1 {
	margin: 0 10px 0 0;
	color: var(--green);
}

.decrease-minute, .increase-minute {
	margin-left: 5px !important;
	height: 2.25em;
}

.decrease-minute i, .increase-minute i {
	font-weight: 900;
}
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
