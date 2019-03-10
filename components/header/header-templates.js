const makeCss = (component) => (
`
<style>
@import "/global-styles.css";
</style>
`
);

const makeHtml = (component) => (
`
<header>
	<h1>Good Watch Bad Watch</h1>
</header>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
