const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

gwbw-deviation-graph[loading] {
	// background-color: var(--silver);
}

gwbw-deviation-graph[loading] canvas {
	width: 100%;
	aspect-ratio: 2 / 1;
}
</style>
`
);

const makeHtml = (component) => {
	if (!component.measuresData) {
		return `<p>This watch hasn't been measured yet</p>`;
	} else if (component.measuresData.length < 2) {
		return ``;
	} else {
		return `<canvas></canvas>`
	}
};

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
