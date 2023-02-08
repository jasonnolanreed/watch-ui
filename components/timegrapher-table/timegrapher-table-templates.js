const makeHtml = (component) => (
`
<table>
	<tr>
		<th>Position</th>
		<th>Rate</th>
		<th>Amplitude</th>
		<th>Beat Error</th>
	</tr>
	${renderRows(component)}
</table>
`
);

const renderRows = component => {
	let html = ``;
	const positions = [
		{id: "dialUp", label: "Dial Up"},
		{id: "dialDown", label: "Dial Down"},
		{id: "crownRight", label: "Crown Right"},
		{id: "crownDown", label: "Crown Down"},
		{id: "crownLeft", label: "Crown Left"},
		{id: "crownUp", label: "Crown Up"},
	];
	const values = [`Rate`, `Amplitude`, `BeatError`];
	positions.forEach(position => {
		if (
			component.timegrapherResultsData[position.id + values[0]] ||
			component.timegrapherResultsData[position.id + values[1]] ||
			component.timegrapherResultsData[position.id + values[2]]
		) {
			const rate = component.timegrapherResultsData[position.id + "Rate"];
			let row = `<tr>`;
			row += `<td>${position.label}</td>`;
			row += `<td>${rate > 0 ? '+' : ''}${rate}s/d</td>`;
			row += `<td>${component.timegrapherResultsData[position.id + "Amplitude"]}&deg;</td>`;
			row += `<td>${component.timegrapherResultsData[position.id + "BeatError"]}ms</td>`;
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
