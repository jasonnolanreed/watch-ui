export const makeTemplate = (component) => (`
<style>
:host {
/*
	container-name: cq-guide;
	container-type: inline-size;
*/
}

.topics-list {
	margin-top: 0.5rem;

	li {
		margin-bottom: 0.5rem;
	}
}

[scroll-id] {
	transition: 0.5s color ease;

	&.highlighted {
		color: var(--good);
	}
}
</style>

<div class="page-title">
	<gwbw-icon name="info"></gwbw-icon>
	<h1>Good Watch Bad Watch Usage Guide</h1>
</div>

<div class="feature-box">
	<h4>Topics:</h4>
	<ul class="topics-list">
		<li>
			<button class="sneaky-button link-button" scroll-target="devices">
				Devices
			</button>
		</li>
		<li>
			<button class="sneaky-button link-button" scroll-target="registration">
				Registration
			</button>
		</li>
		<li>
			<button class="sneaky-button link-button" scroll-target="addingawatch">
				Adding a watch
			</button>
		</li>
		<li>
			<button class="sneaky-button link-button" scroll-target="settingpreferences">
				Setting preferences
			</button>
		</li>
		<li>
			<button class="sneaky-button link-button" scroll-target="startingsession">
				Starting a session
			</button>
		</li>
		<li>
			<button class="sneaky-button link-button" scroll-target="analyzingintervals">
				Analyzing intervals
			</button>
		</li>
		<li>
			<button class="sneaky-button link-button" scroll-target="usingtimegrapher">
				Using a timegrapher
			</button>
		</li>
		<li>
			<button class="sneaky-button link-button" scroll-target="tipsforsuccess">
				Tips for success
			</button>
		</li>
	</ul>
</div>

<hr>

<h2 scroll-id="devices">Devices</h2>
<p>Details coming soon</p>

<hr>

<h2 scroll-id="registration">Registration</h2>
<p>Details coming soon</p>

<hr>

<h2 scroll-id="addingawatch">Adding a watch</h2>
<p>Details coming soon</p>

<hr>

<h2 scroll-id="settingpreferences">Setting preferences</h2>
<p>Details coming soon</p>

<hr>

<h2 scroll-id="startingsession">Starting a session</h2>
<p>Details coming soon</p>

<hr>

<h2 scroll-id="analyzingintervals">Analyzing intervals</h2>
<p>Details coming soon</p>

<hr>

<h2 scroll-id="usingtimegrapher">Using a timegrapher</h2>
<p>Details coming soon</p>

<hr>

<h2 scroll-id="tipsforsuccess">Tips for success</h2>
<p>Details coming soon</p>
`);
