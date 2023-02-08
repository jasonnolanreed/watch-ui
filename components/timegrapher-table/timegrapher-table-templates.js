import {timegrapherPositions} from "../../utilities/timgrapher.js";

const makeHtml = (component) => (
`
<table>
	<tr>
		<th>Position</th>
		<th>Rate</th>
		<th>Beat Error</th>
		<th>Amplitude</th>
	</tr>
	${renderRows(component)}
</table>
`
);

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
			row += `<td>${rate > 0 ? '+' : ''}${rate}s/d</td>`;
			row += `<td>${component.timegrapherResultsData[position.id + "BeatError"]}ms</td>`;
			row += `<td>${component.timegrapherResultsData[position.id + "Amplitude"]}&deg;</td>`;
			row += `</tr>`;
			html += row;
		}
	});
	return html;
};

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
