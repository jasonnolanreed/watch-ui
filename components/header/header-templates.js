const makeCss = (component) => (
`
<style>
@import "/styles/global-styles.css";

header {
	padding: 2em;
	background-color: var(--almost-white);
}

img {
	max-width: 450px;
	margin: 0 auto;
}
</style>
`
);

const makeHtml = (component) => (
`
<header>
	<img src="/assets/images/logo.png" alt="Good Watch Bad Watch Logo">
</header>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
