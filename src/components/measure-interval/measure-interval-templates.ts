import {Format, Difference} from '../../utilities/date-time.js';
import {roundToOneDecimal} from '../../utilities/number.js';

const makeHtml = (component) => (
`
<a class="back-link" href="javascript:history.back();">
	<gwbw-icon name="arrow_back"></gwbw-icon>
	<span>Back to sessions<span>
</a>

<div class="page-title">
	<gwbw-icon name="straighten"></gwbw-icon>
	<div>
		<h1>Measure Interval</h1>
		<h3>${component.watch.name}</h3>
	</div>
</div>

<div class="feature-box">
	<h3>
		<span class="session-days-range nowrap" title="${Format.dateAndTime(component.startMeasure.targetMoment) + ' - ' + Format.dateAndTime(component.endMeasure.targetMoment)}">
			${Format.dateRange(component.startMeasure.targetMoment, component.endMeasure.targetMoment)}
		</span>
		<small class="session-duration-in-days nowrap" title="${Format.durationLong(component.endMeasure.targetMoment, component.startMeasure.targetMoment)}">
			(${roundToOneDecimal(Difference.days(component.startMeasure.targetMoment, component.endMeasure.targetMoment))} days)
		</small>
	</h3>

	<gwbw-session-total
		session="${encodeURI(JSON.stringify([component.startMeasure, component.endMeasure]))}"
		goodtoleranceplus="${component.watch.goodTolerancePlus}"
		goodtoleranceminus="${component.watch.goodToleranceMinus}"
	></gwbw-session-total>

	<gwbw-positions-graph
		positions="${encodeURI(JSON.stringify(component.positions))}"
		goodtoleranceplus="${component.watch.goodTolerancePlus}"
		goodtoleranceminus="${component.watch.goodToleranceMinus}"
		sortedpositionnames="${component.sortedPositionNames.join(';;;')}"
	></gwbw-positions-graph>
</div>

<div class="sort-controls">
	<label>Sort:</label>
	<nav class="toggle-buttons" aria-label="Sort positions">
		<button type="button"
			class="default ${component.preferences.positionsSort.includes('default') ? 'selected' : ''}"
			${component.preferences.positionsSort.includes('default') && 'tabindex="-1" style="pointer-events: none;"'}
		>
			Default
			<gwbw-icon name="expand_more"></gwbw-icon>
		</button>
		<button type="button"
			class="rate ${component.preferences.positionsSort.includes('rate') ? 'selected' : ''}"
			${component.preferences.positionsSort.includes('rate') && 'tabindex="-1" style="pointer-events: none;"'}
		>
			Rate
			<gwbw-icon name="expand_less"></gwbw-icon>
		</button>
	</nav>
</div>

<div class="positions-detail">
	<gwbw-positions-detail
		positions="${encodeURI(JSON.stringify(component.positions))}"
		goodtoleranceplus="${component.watch.goodTolerancePlus}"
		goodtoleranceminus="${component.watch.goodToleranceMinus}"
		sortedpositionnames="${component.sortedPositionNames.join(';;;')}"
	></gwbw-positions-detail>
</div>

${component.expandSessionLink ? `
<hr class="semi-compact"/>

<a class="session-interval-link nowrap" href="javascript:window.location.replace('${component.expandSessionLink}');">
	<span>
		<gwbw-icon name="straighten"></gwbw-icon>
		<gwbw-icon name="open_in_full"></gwbw-icon>
		<gwbw-icon name="straighten"></gwbw-icon>
	</span>
	<span>
		Expand to Full Session
	</span>
</a>
` : ``}
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.page-title gwbw-icon { transform: rotate(90deg); }
.session-days-range { margin-right: .2em; }
.sort-controls { display: flex; justify-content: flex-end; align-items: center; gap: 10px; margin: 2em 0; color: var(--blue); }
.sort-controls .toggle-buttons button.selected { pointer-events: none; }
p { margin-top: -1.2em; }
.session-interval-link { display: inline-flex; align-items: center; gap: 4px; }
.session-interval-link, .session-interval-link:hover { text-decoration: none; }
.session-interval-link gwbw-icon[name="straighten"] { font-size: 1.4em; transform: rotate(90deg); }
.session-interval-link gwbw-icon[name="open_in_full"] { font-size: 1.5em; transform: rotate(45deg); position: relative; top: 1px; margin: 0 -0.2em; }
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
