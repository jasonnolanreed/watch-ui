import {PositionsDistributionGraph} from "./positions-distribution-graph";

const makeCss = (component: PositionsDistributionGraph) => (
`
<style>
gwbw-positions-distribution-graph[loading] {
	background-color: var(--silver);
}

gwbw-positions-distribution-graph[loading] canvas {
	width: 100%;
	aspect-ratio: 1 / 1;
}
</style>
`
);

const makeHtml = (component: PositionsDistributionGraph) => (
`
<canvas></canvas>
`
);

export const makeTemplate = (component: PositionsDistributionGraph) => {
	return makeCss(component) + makeHtml(component);
};
