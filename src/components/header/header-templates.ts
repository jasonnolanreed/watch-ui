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

img.small-logo {
	width: 55%;
	max-width: 175px;
	aspect-ratio: 225 / 70;
}

img.large-logo {
	width: 80%;
	max-width: 400px;
	aspect-ratio: 500 / 75;
}

@container cq-header (width < 500px) {
	img.small-logo {
		display: block;
	}
}

@container cq-header (width >= 500px) {
	img.large-logo {
		display: block;
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
		src="assets/images/logo.svg?v=2.2"
		alt="Good Watch Bad Watch Logo"
		loading="lazy"
	>
	<img
		class="small-logo"
		src="assets/images/logo-small.svg?v=2.2"
		alt="Good Watch Bad Watch Logo"
		loading="lazy"
	>
</header>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
