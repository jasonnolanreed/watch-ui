import {timegrapherPositions} from "../../utilities/timgrapher.js";

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
