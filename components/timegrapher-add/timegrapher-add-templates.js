const makeHtml = (component) => (
`
<div class="page-title">
	<gwbw-icon name="mic_external_on"></gwbw-icon>
	<h1>Add Timegrapher Results</h1>
</div>
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
