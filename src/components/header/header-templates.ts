const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

header {
	padding: 2rem 2rem 1.5rem 2rem;
	container-type: inline-size;
	container-name: cq-header;
}

img[class*="logo"] {
	display: none;
	margin: 0 auto;
}

@container cq-header (width < 700px) {
	img.small-logo {
		display: block;
		width: 55%;
		max-width: 275px;
	}
}

@container cq-header (width >= 700px) {
	img.large-logo {
		display: block;
		width: 80%;
		max-width: 500px;
	}
}
</style>
`
);

const makeHtml = (component) => (
`
<header>
	<img
		class="large-logo"
		src="assets/images/logo.svg"
		alt="Good Watch Bad Watch Logo"
		loading="lazy"
		style="aspect-ratio: 500 / 77;"
	>
	<img
		class="small-logo"
		src="assets/images/logo-small.svg"
		alt="Good Watch Bad Watch Logo"
		loading="lazy"
		style="aspect-ratio: 275 / 96;"
	>
</header>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
