import {Format, Difference} from '../../utilities/date-time.js';
import {roundToTwoDecimals} from '../../utilities/number.js';

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
</style>
`
);

const getRate = component => {
	const intervalDistanceInDays =
		Difference.days(component.startMeasure.targetMoment, component.endMeasure.targetMoment);
	const diffAtEnd = Difference.seconds(component.endMeasure.moment, component.endMeasure.targetMoment);
	const diffAtStart = Difference.seconds(component.startMeasure.moment, component.startMeasure.targetMoment);
	const intervalDrift = diffAtEnd - diffAtStart;
	return roundToTwoDecimals(intervalDrift / intervalDistanceInDays);
};

const getClasses = component => {
	const isGood = Math.abs(getRate(component)) <= component.watch.goodTolerance;
	if (isGood) { return `good-watch`; }
	return `bad-watch`;
};

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
