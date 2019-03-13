const makeHtml = (component) => (
`
<nav>
	<!--
	<a href="/#/" data-navigo>Home</a>
	<a href="/#/watches" data-navigo>Watches</a>
	<a href="/#/notfound" data-navigo>Not Found</a>
	-->
</nav>
`
);

const makeCss = (component) => (
`
<style>
@import "/styles/global-styles.css";

nav {
	padding: 1em 2em;
	background-color: var(--dark-blue);
	color: #fff;
}

a {
	margin-right: 1em;
	font-weight: 700;
	color: #fff;
}

a:hover {
	color: var(--light-blue);
}

a:active {
	color: var(--bright-blue);
}
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
