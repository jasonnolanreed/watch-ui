import {Loader} from "./loader";

const makeCss = (component: Loader) => (
String.raw`
<style>
:host {
	position: fixed;
	top: 0; right: 0; bottom: 0; left: 0;
	z-index: 10;
	pointer-events: none;
}

.loader-container {
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	text-align: center;
	pointer-events: none;
	opacity: 0;
	transition: opacity ${component.transitionDuration / 1000}s ease;
}

:host([loading]) .loader-container {
	opacity: 1;
}

.panel {
	width: 15rem;
	max-width: 90vw;
	padding: 2.5rem 3.5rem 1rem 3.5rem;
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 6px;
	box-shadow: 0 0 4rem rgba(0, 0, 0, 0.25);
}

img {
	aspect-ratio: 1 / 1;
	width: 150px;
	max-width: 100%;
	height: auto;
	margin-bottom: 2rem;
	animation: spin 1s ease infinite;
	pointer-events: none;
}

@keyframes spin {
	50% {
		transform: rotate(180deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
`
);

const makeHtml = (component: Loader) => (
String.raw`
<div class="loader-container hidden" inert>
	<div class="panel">
		<img src="assets/images/jewel.svg" alt="loading">
		<p>Loading...</p>
	</div>
</div>
`
);

export const makeTemplate = (component: Loader) => {
	return makeCss(component) + makeHtml(component);
};
