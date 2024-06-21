const makeCss = (component) => (String.raw `
<style>
gwbw-positions-distribution-graph[loading] {
	background-color: var(--silver);
}

gwbw-positions-distribution-graph[loading] canvas {
	width: 100%;
	aspect-ratio: 1 / 1;
}
</style>
`);
const makeHtml = (component) => (String.raw `
<canvas></canvas>
`);
export const makeTemplate = (component) => {
    return makeCss(component) + makeHtml(component);
};
