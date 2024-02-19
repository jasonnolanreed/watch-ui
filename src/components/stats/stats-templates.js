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
<div><b>Timegrapher Results:</b> ${component.stats.timegrapherResultsCount}</div>

<br/><br/>

<div class="results">
	<div class="results-set">
		<h1>Latest Measures</h1>
		${outputLineItem(component.stats.latestMeasures)}
	</div>
	<div class="results-set">
		<h1>Latest Timegrapher Results</h1>
		${outputLineItem(component.stats.latestTimegrapherResults)}
	</div>
</div>

<style>
@import "styles/global-styles.css";

.results {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
}

.results-set {
	flex: 1;
	min-width: 250px;
}
</style>
`
);

const outputLineItem = dataList => {
	let html = ``;
	dataList.map(item => {
		html += `
			<div>
				<b>${Format.dateAndTime(item.date)}:</b>
				<a href="#/watches/${item.watchId}">${item.watch}</a>
			</div>
			<div>${item.user}</div>
			<hr class="compact"/>
		`;
	});
	return html;
};
