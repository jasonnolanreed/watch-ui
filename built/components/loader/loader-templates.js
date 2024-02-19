const makeCss = (component) => (`
<style>
@import "styles/global-styles.css";

:host {
	display: none !important;
	position: fixed;
	top: 0; right: 0; bottom: 0; left: 0;
	z-index: 10;
	pointer-events: none;
}

:host([loading]) {
	display: block !important;
}

:host([loading]) .loader-container {
	opacity: 1;
}

.loader-container {
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	pointer-events: none;
	opacity: 0;
	transition: opacity 0.3s ease;
}

gwbw-icon {
	animation: spin 1s ease infinite;
	pointer-events: none;
}

svg {
	width: 10em !important;
	height: 10em !important;
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
`);
const makeHtml = (component) => (`
<div class="loader-container">
	<gwbw-icon name="hourglass_empty"></gwbw-icon>
</div>
`);
export const makeTemplate = (component) => {
    return makeCss(component) + makeHtml(component);
};
