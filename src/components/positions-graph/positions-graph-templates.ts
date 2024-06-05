import {PositionsGraph} from "./positions-graph";

const makeCss = (component: PositionsGraph) => (
`
<style>
gwbw-positions-graph[loading] {
	background-color: var(--silver);
}

gwbw-positions-graph[loading] canvas {
	width: 100%;
	aspect-ratio: 2 / 1;
}
</style>
`
);

const makeHtml = (component: PositionsGraph) => (
`
<canvas></canvas>
`
);

export const makeTemplate = (component: PositionsGraph) => {
	return makeCss(component) + makeHtml(component);
};
