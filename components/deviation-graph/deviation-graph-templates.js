const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

gwbw-deviation-graph[loading] {
	background-color: var(--silver);
}

gwbw-deviation-graph[loading] canvas {
	width: 100%;
	aspect-ratio: 2 / 1;
}
</style>
`
);

const makeHtml = (component) => (
`
<canvas></canvas>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
