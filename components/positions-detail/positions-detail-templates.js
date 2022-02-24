import {positionsMap, getIconNameForPosition} from '../../utilities/position.js';
import {roundToTwoDecimals} from '../../utilities/number.js';

const makeHtml = (component) => (
`
<h2>Positions</h2>
<div class="positions">
${showPositions(component)}
</div>
<div class="graph">
${showPositionsGraph(component)}
</div>
<div class="graph">
${showPositionsDistributionGraph(component)}
</div>
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.positions { margin-top: -0.5em; }
.position { margin-bottom: 0.25em; }
.position gwbw-icon { margin-right: 0.2em; transform: scale(1.5); color: var(--blue); }
.rate { white-space: nowrap; }
.rate.fast:before { content: "+"; }
.rate.good-watch { color: var(--green); }
.rate.bad-watch { color: var(--red); }
.duration { display: block; margin: 0.1em 0 1em; }
</style>
`
);

const showPositions = component => {
	let positionsHtml = ``;
	for (const positionName of Object.keys(positionsMap)) {
		const position = component.positions[positionName];
		if (!position) { continue; }
		positionsHtml += `
		<div class="position">
			<em>
				<gwbw-icon name="${getIconNameForPosition(positionName)}"></gwbw-icon>
				<span>${positionsMap[positionName].label}:</span>
			</em>
			<span class="rate ${getRateClasses(position.rate, component.goodtoleranceplus, component.goodtoleranceminus)}">${position.rate} seconds/day</span>
			<small class="duration">
				<span class="nowrap">Duration: ${roundToTwoDecimals(position.days)} days /</span>
				<span class="nowrap">Average: ${roundToTwoDecimals(position.days / position.positionCount)} days</span>
			</small>
		</div>
		`;
	}
	return positionsHtml;
};

const getRateClasses = (rate, goodTolerancePlus, goodToleranceMinus) => {
	let classes = [];
	if (rate < 0) {
		classes.push(`slow`);
	} else {
		classes.push(`fast`);
	}
	if (rate <= goodTolerancePlus && rate >= -1 * goodToleranceMinus) {
		classes.push(`good-watch`);
	} else {
		classes.push(`bad-watch`);
	}
	return classes.length ? classes.join(` `) : ``;
};

const showPositionsGraph = component => {
	return `
	<br><br>
	<gwbw-positions-graph
		positions="${encodeURI(JSON.stringify(component.positions))}"
		goodtoleranceplus="${component.goodtoleranceplus}"
		goodtoleranceminus="${component.goodtoleranceminus}"
	></gwbw-positions-graph>
	<br>
	`;
};

const showPositionsDistributionGraph = component => {
	return ``;
	return `
	<br>
	<gwbw-positions-distribution-graph
		positions="${encodeURI(JSON.stringify(component.positions))}"
	></gwbw-positions-graph>
	<br>
	<br>
	<br>
	`;
};

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
