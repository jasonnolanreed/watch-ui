import { mockGoodToleranceMinus, mockGoodTolerancePlus, mockInterval, mockMeasures, mockPositions, mockPositionsInterval, mockSortedPositionNames, mockWatch } from "../../data/mock-watch.data.js";
export const makeTemplate = (component) => (String.raw `
<style>
:host {
	container-name: cq-home;
	container-type: inline-size;
}

.page-title {
	justify-content: center !important;
	margin-bottom: 1.5rem !important;
}
	
.jewel-logo {
	width: 5rem;
	height: auto;
	margin-right: 0.75rem;
	animation: jewelspin 4s linear infinite;
}

p {
	text-align: center;
	margin-left: auto !important;
	margin-right: auto !important;
}

h2 {
	text-align: center !important;
}

.feature-container {
	padding: 2rem 1rem;
	zoom: 0.9;
	pointer-events: none;
}
.feature-container,
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
}

.feature-photo img {
	border-radius: 1rem;
}

.form-controls {
	justify-content: center !important;
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

@supports (container-type: inline-size) {
	@container cq-home (width < 500px) {
		.page-title {
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			margin-bottom: 3rem !important;
		}

		.jewel-logo {
			width: 5rem;
			margin: 0 auto;
		}
	}
}

@supports not (container-type: inline-size) {
	@media (width < 530px) {
		.page-title {
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			margin-bottom: 3rem !important;
		}

		.jewel-logo {
			width: 5rem;
			margin: 0 auto;
		}
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
		<img class="jewel-logo" src="assets/images/jewel.svg?v=3" alt="jewel logo" style="aspect-ratio: 1 / 1;">
	</div>
	<div>
		<h1>
			<span class="nowrap">Good Watch</span>
			<span class="nowrap"">Bad Watch</span>
		</h1>
		<h2>
			<span class="nowrap">The Premium</span>
			<span class="nowrap">Watch Timing App</span>
		</h2>
	</div>
</div>

<br>

<p>
	Welcome to the ultimate mechanical watch timing app.
	<b class="nowrap">Good Watch Bad Watch</b> is a premium tool for tracking the accuracy of your watches.
	Visualize the behavior of your watches in a way that is easy to understand, and learn how to get the best out of them.
</p>

<div>
	<br>
	<div class="feature-photo">
		<img src="assets/images/photos/3879-table.jpg?v=1" alt="photo of chronograph watch" style="aspect-ratio: 3 / 1; object-fit: cover;">
	</div>
	<br><br><br><br>
</div>

<div>
	<h2>Visualize your watch's performance</h2>
	<p>
		Quickly understand how the timing of your watch drifts against perfect time and whether it falls within expected accuracy specs.
	</p>
	<br>
	<div class="feature-container">
		<gwbw-deviation-graph
			watch="${encodeURI(JSON.stringify(mockWatch))}"
			measures="${encodeURI(JSON.stringify(mockMeasures))}"
		></gwbw-deviation-graph>
		<gwbw-session-total
			goodtoleranceminus="${mockGoodToleranceMinus}"
			goodtoleranceplus="${mockGoodTolerancePlus}"
			session="${encodeURI(JSON.stringify(mockMeasures))}"
		></gwbw-session-total>
	</div>
	<br><br><br><br>
</div>

<div>
	<h2>Learn how your watch behaves</h2>
	<p>
		Gain insight into how different positions affect the time keeping of your watch so you can use them to your advantage.
	</p>
	<br>
	<div class="feature-container">
		<gwbw-positions-graph
			goodtoleranceminus="${mockGoodToleranceMinus}"
			goodtoleranceplus="${mockGoodTolerancePlus}"
			positions="${encodeURI(JSON.stringify(mockPositions))}"
			sortedpositionnames="${mockSortedPositionNames}"
		></gwbw-positions-graph>
		<br><br>
		<gwbw-positions-detail
			goodtoleranceminus="${mockGoodToleranceMinus}"
			goodtoleranceplus="${mockGoodTolerancePlus}"
			positions="${encodeURI(JSON.stringify(mockPositions))}"
			sortedpositionnames="${mockSortedPositionNames}"
		></gwbw-positions-detail>
	</div>
	<br><br><br><br>
</div>

<div>
	<h2>Master the tools</h2>
	<p>
		Slice and dice the data any way you want; zoom in on a particular section of a timing session to get a closer look.
	</p>
	<br>
	<img class="feature" src="assets/images/screenshots/example-measures.jpg?v=3" alt="screenshot of list of measures" style="aspect-ratio: 1448 / 1148;">
	<gwbw-icon class="between-screenshots" name="arrow_downward"></gwbw-icon>
	<div class="feature-container">
		<gwbw-session-total
			goodtoleranceminus="${mockGoodToleranceMinus}"
			goodtoleranceplus="${mockGoodTolerancePlus}"
			session="${encodeURI(JSON.stringify(mockInterval))}"
		></gwbw-session-total>
		<gwbw-positions-graph
			goodtoleranceminus="${mockGoodToleranceMinus}"
			goodtoleranceplus="${mockGoodTolerancePlus}"
			positions="${encodeURI(JSON.stringify(mockPositionsInterval))}"
			sortedpositionnames="${mockSortedPositionNames}"
		></gwbw-positions-graph>
	</div>
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
