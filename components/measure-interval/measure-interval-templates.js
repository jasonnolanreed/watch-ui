import {Format, Difference} from '../../utilities/date-time.js';
import {Timing} from '../../utilities/timing.js';
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
${component.expandSessionLink ? `
<div class="session-interval-link">
	<a href="javascript:window.location.replace('${component.expandSessionLink}');">
		<span class="nowrap">
			<gwbw-icon name="straighten"></gwbw-icon>
			<gwbw-icon name="open_in_full"></gwbw-icon>
			<gwbw-icon name="straighten"></gwbw-icon>
		<span>
		<span class="nowrap">
			Expand to Full Session
		</span>
	</a>
</div>
` : ``}
<hr/>
<div class="positions-detail">
	<gwbw-positions-detail
		watchid="${component.watch._id}"
		startmeasureid="${component.startMeasure._id}"
		endmeasureid="${component.endMeasure._id}"
		goodtoleranceplus="${component.watch.goodTolerancePlus}"
		goodtoleranceminus="${component.watch.goodToleranceMinus}"
	></gwbw-positions-detail>
</div>
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.page-title gwbw-icon { transform: rotate(90deg); }
.session-days-range { margin-right: .2em; }
p { margin-top: -1.2em; }
.positions-detail { margin-bottom: 2em; }
.session-interval-link { margin-bottom: 2em; line-height: 1.4; }
.session-interval-link *, .session-interval-link:hover * { text-decoration: none; }
.session-interval-link gwbw-icon[name="straighten"] { font-size: 1.4em; transform: rotate(90deg); }
.session-interval-link gwbw-icon[name="open_in_full"] { font-size: 1.5em; transform: rotate(45deg); position: relative; top: 0.1em; margin: 0 -0.2em; }
</style>
`
);

const getRate = component => {
	return Timing.rate(
		component.startMeasure.targetMoment, component.startMeasure.moment,
		component.endMeasure.targetMoment, component.endMeasure.moment
	);
};

const getClasses = component => {
	const isGood =
		getRate(component) <= component.watch.goodTolerancePlus &&
		getRate(component) >= -1 * component.watch.goodToleranceMinus;
	return isGood ? `good-watch` : `bad-watch`;
};

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
