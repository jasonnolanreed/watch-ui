const makeHtml = (component) => (
`
<h1>${component.watch.name}</h1>
<p>This watch has not been measured yet.</p>
<a href="#/watches/measure/${component.watch._id}" class="button">Take Measurement</a>
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
