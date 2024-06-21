import {DeviationGraph} from "./deviation-graph";

const makeCss = (component: DeviationGraph) => (
String.raw`
<style>
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

const makeHtml = (component: DeviationGraph) => {
	if (!component.measuresData) {
		return String.raw`<p style="margin: 0;">This watch hasn't been measured yet</p>`;
	} else if (component.measuresData.length < 2) {
		return ``;
	} else {
		return `<canvas></canvas>`
	}
};

export const makeTemplate = (component: DeviationGraph) => {
	return makeCss(component) + makeHtml(component);
};
