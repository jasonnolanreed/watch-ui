import {timegrapherPositions} from "../../utilities/timegrapher.js";

const makeHtml = (component) => {
if (!component.timegrapherResultsData) {
	return `<p>No results have been entered yet</p>`;
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

const renderRows = component => {
	let html = ``;
	const positions = timegrapherPositions;
	positions.forEach(position => {
		if (
			component.timegrapherResultsData[position.id + "Rate"] ||
			component.timegrapherResultsData[position.id + "BeatError"] ||
			component.timegrapherResultsData[position.id + "Amplitude"]
		) {
			const rate = component.timegrapherResultsData[position.id + "Rate"];
			let row = `<tr>`;
			row += `<td>${position.label}</td>`;
			row += `<td class="${getGoodBadClass(component, rate)}">${rate > 0 ? '+' : ''}${typeof rate === "number" ? rate + 's/d' : '&mdash;'}</td>`;
			row += `<td>${typeof component.timegrapherResultsData[position.id + "Amplitude"] === "number" ? component.timegrapherResultsData[position.id + "Amplitude"] + '&deg;' : '&mdash;'}</td>`;
			row += `<td>${typeof component.timegrapherResultsData[position.id + "BeatError"] === "number" ? component.timegrapherResultsData[position.id + "BeatError"] + 'ms' : '&mdash;'}</td>`;
			row += `</tr>`;
			html += row;
		}
	});
	return html;
};

const getGoodBadClass = (component, rate) => {
	const {goodTolerancePlus, goodToleranceMinus} = component.watchData;
	if (typeof rate !== `number`) {
		return ``;
	} else if (rate <= goodTolerancePlus && rate >= -1 * goodToleranceMinus) {
		return `good`;
	} else {
		return `bad`;
	}
};

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

table {
	margin: 2rem 0;
}

tr.averages {
	background-color: var(--gray);
}

tr.averages td {
	border-top: 1px solid var(--medium-gray);
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

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
