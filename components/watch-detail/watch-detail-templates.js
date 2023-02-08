const makeHtml = (component) => (
`
<div class="page-title">
	<gwbw-icon name="watch"></gwbw-icon>
	<h1>${component.watch.name}</h1>
</div>

<div class="session feature-box-alt">
	<h2>Latest Session</h2>
	<gwbw-deviation-graph
		measures="${encodeURI(JSON.stringify(component.latestSession))}"
		watch="${encodeURI(JSON.stringify(component.watch))}"
	></gwbw-deviation-graph>
	<gwbw-session-total
		session="${encodeURI(JSON.stringify(component.latestSession))}"
		goodtoleranceplus="${component.watch.goodTolerancePlus}"
		goodtoleranceminus="${component.watch.goodToleranceMinus}"
	></gwbw-session-total>
	<br>
	<a href="#/sessions/${component.watch._id}" class="button feature-button">
		<gwbw-icon name="insert_chart"></gwbw-icon> Sessions
	</a>
</div>

<br><br>

<div class="timegrapher feature-box-alt">
	<h2>Timegrapher Results</h2>
	<gwbw-timegrapher-table
		timegrapherresults="${encodeURI(JSON.stringify(component.latestTimegrapherResults))}"
	></gwbw-timegrapher-table>
	<br><br>
	<a href="javascript:void(0);" class="button feature-button">
		<gwbw-icon name="mic_external_on"></gwbw-icon> Timegrapher
	</a>
</div>


<br><br>


<div class="details">
...details...
</div>
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.feature-button.feature-button.feature-button {
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	gap: 0.25em;
}

.feature-button gwbw-icon {
	font-size: 1.4em;
}
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
