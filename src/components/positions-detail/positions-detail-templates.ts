import {positionsMap, getIconNameForPosition} from '../../utilities/position.js';
import {roundToOneDecimal} from '../../utilities/number.js';

import {PositionsDetail} from './positions-detail.js';

const makeHtml = (component: PositionsDetail) => (
`
<h2>Positions</h2>
<div class="positions">
	<table>
		<tr>
			<th>Position</th>
			<th>Rate</th>
			<th>Duration</th>
			<th>Avg. Duration</th>
		</tr>
		${renderPositionsRows(component)}
	</table>
</div>
`
);

const makeCss = (component: PositionsDetail) => (
`
<style>
.positions {}
.position gwbw-icon { margin-right: 0.2em; transform: scale(1.5); color: var(--blue); }
.rate.fast:before { content: "+"; }
.rate.good-watch { color: var(--green); }
.rate.bad-watch { color: var(--red); }
</style>
`
);

const renderPositionsRows = (component: PositionsDetail) => {
	let positionsHtml = ``;
	for (const positionName of component.sortedPositionNamesArray) {
		const positionLabel: string = positionsMap[positionName]?.label || positionName;
		const position = component.positionsData[positionName];
		if (!position) { continue; }
		const displayRate = (position.rate !== 0) ?
			`${position.rate}s/d` :
			"Perfect";
		positionsHtml += `
		<tr class="position">
			<td class="ellipsis" style="max-width: 200px;">
				<span title="${positionLabel}">
					<gwbw-icon name="${getIconNameForPosition(positionName)}"></gwbw-icon>
					<span>${positionLabel}</span>
				</span>
			</td>
			<td>
				<span
					class="rate nowrap ${getRateClasses(position.rate, component.goodTolerancePlusNumber, component.goodToleranceMinusNumber)}"
				>${displayRate}</span>
			</td>
			<td>
				<span class="nowrap">${roundToOneDecimal(position.days)} days</span>
			</td>
			<td>
				<span class="nowrap">${roundToOneDecimal(position.days / position.positionCount)} days</span>
			</td>
		</tr>
		`;
	}
	return positionsHtml;
};

const getRateClasses = (rate: number, goodTolerancePlus: number, goodToleranceMinus: number) => {
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

export const makeTemplate = (component: PositionsDetail) => {
	return makeCss(component) + makeHtml(component);
};
