import {getIconNameForPosition} from "../../utilities/position.js";
import {timegrapherPositions, timegrapherToStandardPositionMap} from "../../utilities/timegrapher.js";
import {TimegrapherTable} from "./timegrapher-table.js";

const makeHtml = (component: TimegrapherTable) => {
if (!component.timegrapherResultsData) {
	return `<p style="margin: 0;">No results have been entered yet</p><br/><br/>`;
} else {
	return `
	<table>
		<tr>
			<th>Position</th>
			<th>Rate</th>
			<th>Amplitude</th>
			<th>Beat Error</th>
		</tr>
		${renderRows(component)}
		<tr class="averages">
			<td>Average</td>
			<td class="${getGoodBadClass(component, component.averages.rate)}">
				${component.averages.rate > 0 ? '+' : ''}${typeof component.averages.rate === "number" ? component.averages.rate + 's/d' : '&mdash;'}
			</td>
			<td>
				${typeof component.averages.amplitude === "number" ? component.averages.amplitude + '&deg;' : '&mdash;'}
			</td>
			<td>
				${typeof component.averages.beatError === "number" ? component.averages.beatError + 'ms' : '&mdash;'}
			</td>
		</tr>
	</table>
	`;
}
};

const renderRows = (component: TimegrapherTable) => {
	let html = ``;
	const positions = timegrapherPositions;
	positions.forEach(position => {
		if (
			component.timegrapherResultsData[position.id + "Rate"] ||
			component.timegrapherResultsData[position.id + "BeatError"] ||
			component.timegrapherResultsData[position.id + "Amplitude"]
		) {
			const rate = component.timegrapherResultsData[position.id + "Rate"];
			let row = `<tr class="position">`;
			row += `
			<td class="ellipsis" style="max-width: 200px;">
				<span title="${position.label}">
					<gwbw-icon name="${getIconNameForPosition(timegrapherToStandardPositionMap[position.id])}"></gwbw-icon>
					<span>${position.label}</span>
				</span>
			</td>
			`;

			row += `<td class="${getGoodBadClass(component, rate)}">${rate > 0 ? '+' : ''}${typeof rate === "number" ? rate + 's/d' : '&mdash;'}</td>`;
			row += `<td>${typeof component.timegrapherResultsData[position.id + "Amplitude"] === "number" ? component.timegrapherResultsData[position.id + "Amplitude"] + '&deg;' : '&mdash;'}</td>`;
			row += `<td>${typeof component.timegrapherResultsData[position.id + "BeatError"] === "number" ? component.timegrapherResultsData[position.id + "BeatError"] + 'ms' : '&mdash;'}</td>`;
			row += `</tr>`;
			html += row;
		}
	});
	return html;
};

const getGoodBadClass = (component: TimegrapherTable, rate) => {
	const {goodTolerancePlus, goodToleranceMinus} = component.watchData;
	if (typeof rate !== `number`) {
		return ``;
	} else if (rate <= goodTolerancePlus && rate >= -1 * goodToleranceMinus) {
		return `good`;
	} else {
		return `bad`;
	}
};

const makeCss = (component: TimegrapherTable) => (
`
<style>
table {
	margin: 2rem 0;
}

.position gwbw-icon {
	margin-right: 0.2em;
	transform: scale(1.5);
	color: var(--blue);
}

tr.averages td {
	background-color: #fff;
	border-top: 4px solid var(--gray);
	font-weight: bold;
}

td.good {
	color: var(--green);
}

td.bad {
	color: var(--red);
}
</style>
`
);

export const makeTemplate = (component: TimegrapherTable) => {
	return makeCss(component) + makeHtml(component);
};
