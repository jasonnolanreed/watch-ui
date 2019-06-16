import {positionsMap, getIconNameForPosition} from '../../utilities/position.js';
import {roundToTwoDecimals} from '../../utilities/number.js';

const makeHtml = (component) => (
`
<h2>Positions</h2>
<div class="positions">
${showPositions(component)}
</div>
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.positions { margin-top: -1.2em; }
.position { margin-bottom: 0.25em; }
.position i { margin-right: 0.2em; transform: scale(1.5); color: var(--blue); }
.rate.fast:before { content: "+"; }
.rate.good-watch { color: var(--green); }
.rate.bad-watch { color: var(--red); }
.at { font-size: 0.7em; color: var(--light-blue); }
</style>
`
);

const showPositions = component => {
	let positionsHtml = ``;
	for (const positionName of Object.keys(component.positions)) {
		const position = component.positions[positionName];
		positionsHtml += `
		<div class="position">
			<em>
				<i class="material-icons inline">${getIconNameForPosition(positionName)}</i>
				<span>${positionsMap[positionName].label}:</span>
			</em>
			<span class="days">${roundToTwoDecimals(position.days)} days</span>
			<span class="at">&nbsp;@&nbsp;</span>
			<span class="rate ${getRateClasses(position.rate, component.goodtolerance)}">${position.rate} seconds/day</span>
		</div>
		`;
	}
	return positionsHtml;
};

const getRateClasses = (rate, goodTolerance) => {
	let classes = [];
	if (rate < 0) {
		classes.push(`slow`);
	} else {
		classes.push(`fast`);
	}
	if (Math.abs(rate) <= goodTolerance) {
		classes.push(`good-watch`);
	} else {
		classes.push(`bad-watch`);
	}
	return classes.length ? classes.join(` `) : ``;
};

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
