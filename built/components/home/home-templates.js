export const makeTemplate = (component) => (`
<style>
:host {
	container-name: cq-home;
	container-type: inline-size;
}

.page-title.page-title {
	justify-content: center;
}

.jewel-logo {
	width: 5rem;
	height: auto;
	margin-right: 0.75rem;
	animation: jewelspin 4s linear infinite;
}

img.feature,
.feature-photo {
	margin-left: 6px;
	margin-right: 6px;
	width: calc(100% - 12px);
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 0 0 6px var(--silver), 0 0 1.5rem 4px rgba(0, 0, 0, 0.5);
	border-radius: 1rem;
}

.feature-photo {
	position: relative;

	img {
		border-radius: 1rem;
	}
}

@supports (mix-blend-mode: overlay) {
	.feature-photo::after {
		content: "";
		display: block;
		position: absolute;
		top: 0; right: 0; bottom: 0; left: 0;
		mix-blend-mode: overlay;
		background: linear-gradient(135deg, var(--muted-red), var(--muted-green) 100%, var(--muted-green));
		background-repeat: no-repeat;
		background-size: cover;
		border-radius: 1rem;
		pointer-events: none;
	}
}

.form-controls {
	align-items: center !important;
}

.form-controls > * {
	width: 50%;
	text-align: center;
}

gwbw-icon.between-screenshots {
	display: block;
	margin: 0.5rem auto;
	font-size: 3rem;
	text-align: center;
}

@container cq-home (width < 500px) {
	.page-title {
		flex-wrap: wrap;
		text-align: center;
		margin-bottom: 3rem !important;

		> * {
			width: 100%;
		}
	}

	.jewel-logo {
		width: 5rem;
		margin: 0 auto;
	}
}

@keyframes jewelspin {
	50% {
		transform: rotate(180deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>

<div class="page-title">
	<div>
		<img class="jewel-logo" src="assets/images/jewel.svg?v=1" alt="jewel logo" style="aspect-ratio: 1 / 1;">
	</div>
	<div>
		<h1>
			<span class="nowrap">Good Watch</span>
			<span class="nowrap"">Bad Watch</span>
		</h1>
		<h4>
			<span class="nowrap">The Premium</span>
			<span class="nowrap">Watch Timing App</span>
		</h4>
	</div>
</div>

<br>

<p>
	Welcome to the ultimate mechanical watch enthusiast app.
	<b class="nowrap">Good Watch Bad Watch</b> is a premium tool for tracking the performance of your watches.
	Visualize the behavior of your watches in a way that is easy to understand, and learn how to get the best out of them.
</p>

<div>
	<br><br>
	<div class="feature-photo">
		<img src="assets/images/photos/3879-wrist.jpg?v=2" alt="photo of chronograph watch on wrist" style="aspect-ratio: 1000 / 450;">
	</div>
	<br><br><br><br>
</div>

<div>
	<h2>Visualize your watch's performance</h2>
	<p>
		Quickly understand how the timing of your watch drifts against perfect time and whether it falls within expected accuracy specs.
	</p>
	<br>
	<img class="feature" src="assets/images/screenshots/example-deviation-graph.png" alt="screenshot of line graph" style="1378 / 794;">
	<br><br><br><br>
</div>

<div>
	<h2>Learn how your watch behaves</h2>
	<p>
		Gain insight into how different positions affect the time keeping of your watch so you can use them to your advantage.
	</p>
	<br>
	<img class="feature" src="assets/images/screenshots/example-positions-graph.png" alt="screenshot of bar graph" style="aspect-ratio: 1480 / 1410;">
	<br><br><br><br>
</div>

<div>
	<h2>Master the tools</h2>
	<p>
		Slice and dice the data any way you want; zoom in on a particular section of a timing session to get a closer look.
	</p>
	<br>
	<img class="feature" src="assets/images/screenshots/example-measures.jpg" alt="screenshot of list of measures" style="aspect-ratio: 1495 / 1142;">
	<gwbw-icon class="between-screenshots" name="arrow_downward"></gwbw-icon>
	<img class="feature" src="assets/images/screenshots/example-interval.png" alt="screenshot of positions graph" style="aspect-ratio: 1376 / 772;">
	<br><br><br><br>
</div>

<p>
	Create your <b>Good Watch Bad Watch</b> account, add your watches, and start getting the most from your collection today.
</p>

<div class="form-controls">
	${component.isLoggedIn ?
    `
	<a class="button positive" href="/#/watches">
		<gwbw-icon name="thumb_up"></gwbw-icon>
		<span>Let's go!</span>
	</a>
	` :
    `
	<a class="button positive" href="/#/register">
		<gwbw-icon name="thumb_up"></gwbw-icon>
		<span>Let's go!</span>
	</a>
	<a class="big-link" href="/#/login">
		<gwbw-icon name="exit_to_app"></gwbw-icon>
		<span>Already a User</span>
	</a>
	`}
</div>
`);
