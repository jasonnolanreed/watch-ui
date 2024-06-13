import {Home} from "./home";

export const makeTemplate = (component: Home) => (
`
<style>
:host {
	container-name: cq-home;
	container-type: inline-size;
}

.jewel-logo {
	width: 4rem;
	height: auto;
	margin-right: 0.75rem;
	animation: jewelspin 2.5s linear infinite;
}

@container cq-home (width < 500px) {
	.page-title {
		flex-wrap: wrap;
		justify-content: center;
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
		<img class="jewel-logo" src="assets/images/jewel.svg" alt="jewel logo">
	</div>
	<div>
		<h1>
			<span class="nowrap">Good Watch</span>
			<span class="nowrap">Bad Watch</span>
		</h1>
		<h3>
			<span class="nowrap">Your Premium</span>
			<span class="nowrap">Watch Performance App</span>
		</h3>
	</div>
</div>

<p>
	Welcome to the premier mechanical watch companion app.
	<b class="nowrap">Good Watch Bad Watch</b> is a premium tool for tracking the performance of your watches.
	Visualize the behavior of your watches in a way that is easy to understand, and learn how to get the best out of them.
</p>

<div>
	<img class="hidden screenshot" src="assets/images/screenshots/example-deviation-graph.png" alt="screenshot of deviation graph">
</div>

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
	<a class="button" href="/#/login">
		<gwbw-icon name="exit_to_app"></gwbw-icon>
		<span>Login</span>
	</a>
	`}
</div>
`
);
