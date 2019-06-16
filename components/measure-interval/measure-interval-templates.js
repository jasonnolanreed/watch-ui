import {Format, Difference} from '../../utilities/date-time.js';
import {Timing} from '../../utilities/timing.js';

const makeHtml = (component) => (
`
<h1><i class="material-icons inline">straighten</i> Measure Interval</h1>
<div class="more-info-header">
	<h1><i class="invisible material-icons inline">straighten</i></h1>
	${' '}<h3>${component.watch.name}</h3>
</div>
<h3>
	<span class="nowrap">${Format.dateAndTime(component.startMeasure.targetMoment)}</span>
	${` `}-${` `}
	<span class="nowrap">${Format.dateAndTime(component.endMeasure.targetMoment)}</span>
</h3>
<p>
	<em>Duration:</em> ${Format.durationLong(component.endMeasure.targetMoment, component.startMeasure.targetMoment)}
</p>
<h2 class="average ${getClasses(component)}">
	Average:${` `}
	<span class="rate ${getRate(component) >= 0 ? `fast` : `slow`}">${getRate(component)} seconds/day</span>
</h2>
<div class="good-bad-message ${getClasses(component)}">
	<h4 class="good"><i class="material-icons inline">thumb_up</i> Good watch</h4>
	<h4 class="bad"><i class="material-icons inline">thumb_down</i> Bad watch</h4>
</div>
<hr>
<div class="positions-detail">
	<gwbw-positions-detail
		watchid="${component.watch._id}"
		startmeasureid="${component.startMeasure._id}"
		endmeasureid="${component.endMeasure._id}"
		goodtolerance="${component.watch.goodTolerance}"
	></gwbw-positions-detail>
</div>
<a class="big-link" href="javascript:history.back();">Back to Measures</button>
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

h1 i { transform: rotate(90deg); }
p { margin-top: -1.2em; }
.average.good-watch { color: var(--green); }
.average.bad-watch { color: var(--red); }
.rate.fast:before { content: "+"; }
.good-bad-message > * { display: none; margin-top: -1.5em; }
.good-bad-message.good-watch .good { display: block; color: var(--green); }
.good-bad-message.bad-watch .bad { display: block; color: var(--red); }
.positions-detail { margin-bottom: 2em; }
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
	const isGood = Math.abs(getRate(component)) <= component.watch.goodTolerance;
	if (isGood) { return `good-watch`; }
	return `bad-watch`;
};

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
