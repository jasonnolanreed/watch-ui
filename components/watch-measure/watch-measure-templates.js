const makeHtml = (component) => (
`
<h1><gwbw-icon name="insert_chart"></gwbw-icon> Measure ${component.watch.name}</h1>
<form>
	<p><em>Step 1)</em> Check the "start new session" box if this is the first measure after having set your watch</p>
	<div class="form-input">
		<label class="check">
			<input type="checkbox" name="firstOfSession" ${component.isNewSession ? `checked` : ``}>
			${` `}Start new session
		</label>
	</div>
	<p><em>Step 2)</em> Set the time below to the time your watch is ABOUT to be</p>
	<div class="form-input target-time">
		<button type="button" class="decrease-quarter button compact low-priority">
			<gwbw-icon name="arrow_back"></gwbw-icon>
		</button>
		<button type="button" class="increase-quarter button compact low-priority">
			<gwbw-icon name="arrow_forward"></gwbw-icon>
		</button>
		<h1 class="target-time">${component.targetTimeString}</h1>
	</div>
	<p><em>Step 3)</em> Hit the "Now!" button at the exact moment your watch matches the above time</p>
	<p>You can add more optional details next</p>
	<div class="form-controls">
		<a href="#/watches/detail/${component.watch._id}" class="button negative">Cancel</a>
		<button type="button" class="button positive now">Now!</button>
	</div>
	${component.atomicOffset && +component.atomicOffset !== 0 ?
	`<p><small>Atomic Offset: ${component.atomicOffset}s</small></p>` :
	``
	}
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
	margin: 0 0 0 10px;
	color: var(--green);
}

.decrease-quarter, .increase-quarter {
	margin-right: 0.35em !important;
	height: 2.25em;
}

.decrease-quarter gwbw-icon, .increase-quarter gwbw-icon {
	font-size: 1.4em;
}

.now {
	min-width: 10em;
}

:host([namedsize=small]) .form-controls {
	display: flex;
}

:host([namedsize=small]) .form-controls .button {
	font-size: 1.2em;
	padding: 0.8em 1em;
}

:host([namedsize=small]) .now {
	width: 100%;
}
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
