const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

header {
	padding: 2em 2em 1em 2em;
	background-color: var(--almost-white);
}

picture {
	display: block;
	width: 65%;
	max-width: 450px;
	margin: 0 auto;
}
</style>
`
);

const makeHtml = (component) => (
`
<header>
	<picture>
		<source srcset="assets/images/logo-small.png"
				media="(max-width: 600px)" alt="God Watch Bad Watch Logo">
		<source srcset="assets/images/logo-medium.png"
				media="(max-width: 1000px)" alt="God Watch Bad Watch Logo">
		<source srcset="assets/images/logo.png"
				media="(min-width: 1000px)" alt="God Watch Bad Watch Logo">
		<img src="assets/images/logo.png" alt="Good Watch Bad Watch Logo">
	</picture>
</header>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
