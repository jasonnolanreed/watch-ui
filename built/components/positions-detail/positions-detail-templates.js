import { positionsMap, getIconNameForPosition } from '../../utilities/position.js';
import { roundToOneDecimal } from '../../utilities/number.js';
const makeHtml = (component) => (`
<h2>Positions</h2>
<div class="positions">
${showPositions(component)}
</div>
`);
const makeCss = (component) => (`
<style>
@import "styles/global-styles.css";

.positions {}
.position { margin-bottom: 0.25em; }
.position gwbw-icon { margin-right: 0.2em; transform: scale(1.5); color: var(--blue); }
.rate { white-space: nowrap; }
.rate.fast:before { content: "+"; }
.rate.good-watch { color: var(--green); }
.rate.bad-watch { color: var(--red); }
.duration { display: block; margin: 0.1em 0 1em; }
</style>
`);
const showPositions = component => {
    let positionsHtml = ``;
    for (const positionName of component.sortedPositionNamesArray) {
        const position = component.positionsData[positionName];
        if (!position) {
            continue;
        }
        const displayRate = (position.rate !== 0) ?
            `${position.rate} seconds/day` :
            "Perfect";
        positionsHtml += `
		<div class="position">
			<em>
				<gwbw-icon name="${getIconNameForPosition(positionName)}"></gwbw-icon>
				<span>${positionsMap[positionName]?.label || positionName}:</span>
			</em>
			<span
				class="rate ${getRateClasses(position.rate, component.goodTolerancePlusNumber, component.goodToleranceMinusNumber)}"
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
    }
    else if (rate > 0) {
        classes.push(`fast`);
    }
    if (rate <= goodTolerancePlus && rate >= -1 * goodToleranceMinus) {
        classes.push(`good-watch`);
    }
    else {
        classes.push(`bad-watch`);
    }
    return classes.length ? classes.join(` `) : ``;
};
export const makeTemplate = (component) => {
    return makeCss(component) + makeHtml(component);
};
