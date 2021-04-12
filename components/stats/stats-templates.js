import {Format} from '../../utilities/date-time.js';

export const makeTemplate = (component) => (
`
<h1><gwbw-icon name="insert_chart"></gwbw-icon> Stats</h1>
<div><b>Users:</b> ${component.stats.usersCount}</div>
<div><b>Pre Users:</b> ${component.stats.preusersCount}</div>
<div><b>Watches:</b> ${component.stats.watchesCount}</div>
<div><b>Measures:</b> ${component.stats.measuresCount}</div>

<h1><gwbw-icon name="insert_chart"></gwbw-icon> Last ${component.stats.latestMeasures.length} Measures</h1>
${outputLatestMeasures(component.stats.latestMeasures)}
`
);

const outputLatestMeasures = latestMeasures => {
	let html = ``;
	latestMeasures.map(measure => {
		html += `
			<div><b>${Format.dateAndTime(measure.date)}:</b> ${measure.watch}</div>
			<div>${measure.user}</div>
			<hr/>
		`;
	});
	return html;
};
