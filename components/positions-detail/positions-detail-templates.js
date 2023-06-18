import {positionsMap, getIconNameForPosition} from '../../utilities/position.js';
import {roundToOneDecimal} from '../../utilities/number.js';

const makeHtml = (component) => (
`
${showSortControls(component)}
<div class="graph">
${showPositionsGraph(component)}
</div>
<h2>Positions</h2>
<div class="positions">
${showPositions(component)}
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

.sort-controls { display: flex; justify-content: flex-end; align-items: center; gap: 10px; margin: 1em 0 2em; color: var(--blue); }
.sort-controls .toggle-buttons button.selected { pointer-events: none; }
.positions {}
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

const showSortControls = component => {
	return `
	<div class="sort-controls">
		<label>Sort:</label>
		<div class="toggle-buttons">
			<button type="button"
				class="default ${component.preferences.positionsSort.includes('default') ? 'selected' : ''}"
				${component.preferences.positionsSort.includes('default') && 'tabindex="-1" style="pointer-events: none;"'}
			>
				Default
				<gwbw-icon name="expand_less"></gwbw-icon>
			</button>
			<button type="button"
				class="rate ${component.preferences.positionsSort.includes('rate') ? 'selected' : ''}"
				${component.preferences.positionsSort.includes('rate') && 'tabindex="-1" style="pointer-events: none;"'}
			>
				Rate
				<gwbw-icon name="expand_more"></gwbw-icon>
			</button>
		</div>
	</div>
	`;
};

const showPositions = component => {
	let positionsHtml = ``;
	for (const positionName of component.sortedPositionNames) {
		const position = component.positions[positionName];
		if (!position) { continue; }
		const displayRate = (position.rate !== 0) ?
			`${position.rate} seconds/day` :
			"Perfect";
		positionsHtml += `
		<div class="position">
			<em>
				<gwbw-icon name="${getIconNameForPosition(positionName)}"></gwbw-icon>
				<span>${positionsMap[positionName].label}:</span>
			</em>
			<span
				class="rate ${getRateClasses(position.rate, component.goodtoleranceplus, component.goodtoleranceminus)}"
			>${displayRate}</span>
			<small class="duration">
				<span class="nowrap">Duration: ${roundToOneDecimal(position.days)} days /</span>
				<span class="nowrap">Average: ${roundToOneDecimal(position.days / position.positionCount)} days</span>
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
	} else if (rate > 0) {
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
	<gwbw-positions-graph
		positions="${encodeURI(JSON.stringify(component.positions))}"
		goodtoleranceplus="${component.goodtoleranceplus}"
		goodtoleranceminus="${component.goodtoleranceminus}"
		sortedpositionnames="${component.sortedPositionNames.join(',')}"
	></gwbw-positions-graph>
	<br/><br/>
	`;
};

const showPositionsDistributionGraph = component => {
	return ``;
	return `
	<br/>
	<gwbw-positions-distribution-graph
		positions="${encodeURI(JSON.stringify(component.positions))}"
	></gwbw-positions-graph>
	<br/>
	<br/>
	<br/>
	`;
};

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
