import {Format} from '../../utilities/date-time.js';

export const makeTemplate = (component) => (
`
<div class="page-title">
	<gwbw-icon name="insert_chart"></gwbw-icon>
	<h1>Stats</h1>
</div>

<div><b>Users:</b> ${component.stats.usersCount}</div>
<div><b>Pre Users:</b> ${component.stats.preusersCount}</div>
<div><b>Watches:</b> ${component.stats.watchesCount}</div>
<div><b>Measures:</b> ${component.stats.measuresCount}</div>

<br><br>

<div class="page-title">
	<gwbw-icon name="insert_chart"></gwbw-icon>
	<h1>Last ${component.stats.latestMeasures.length} Measures</h1>
</div>

${outputLatestMeasures(component.stats.latestMeasures)}

<style>
@import "styles/global-styles.css";
</style>
`
);

const outputLatestMeasures = latestMeasures => {
	let html = ``;
	latestMeasures.map(measure => {
		html += `
			<div><b>${Format.dateAndTime(measure.date)}:</b></div>
			<div><a href="#/watches/detail/${measure.watchId}">${measure.watch}</a></div>
			<div>${measure.user}</div>
			<hr class="compact"/>
		`;
	});
	return html;
};
