import {roundToTwoDecimals} from '../../utilities/number.js';

const makeHtml = (component) => (
`
<h1><i class="material-icons inline">straighten</i> Measure Interval</h1>
<div class="more-info-header">
	<h1><i class="invisible material-icons inline">straighten</i></h1>
	${' '}<h3>${component.watch.name}</h3>
</div>
<h3>
	<span class="nowrap">${moment(+component.startMeasure.targetMoment).format(`MMM Do, hh:mm a`)}</span>
	${` `}-${` `}
	<span class="nowrap">${moment(+component.endMeasure.targetMoment).format(`MMM Do, hh:mm a`)}</span>
</h3>
<p>
	<em>Duration:</em> ${getDuration(component)}
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

const getDuration = component => {
	let secondsOfDuration = moment(+component.endMeasure.targetMoment).diff(moment(+component.startMeasure.targetMoment), `seconds`, true);
	let durationSections = [];
	const days = Math.floor(secondsOfDuration / 86400); // 60 seconds, 60 minutes, 24 hours
	if (days > 0) {
		durationSections.push(`${days} day${days > 1 ? `s` : ``}`);
		secondsOfDuration -= (days * 86400);
	}
	const hours = Math.floor(secondsOfDuration / 3600);
	if (hours > 0) {
		durationSections.push(`${hours} hour${hours > 1 ? `s` : ``}`);
		secondsOfDuration -= (hours * 3600);
	}
	const minutes = Math.floor(secondsOfDuration / 60);
	if (minutes > 0) {
		durationSections.push(`${minutes} minute${minutes > 1 ? `s` : ``}`);
		secondsOfDuration -= (minutes * 60);
	}
	const seconds = Math.floor(secondsOfDuration);
	if (seconds > 0) {
		durationSections.push(`${seconds} second${seconds > 1 ? `s` : ``}`);
	}
	return durationSections.join(`, `);
};

const getRate = component => {
	const intervalDistanceInDays =
		moment(+component.endMeasure.targetMoment).diff(moment(+component.startMeasure.targetMoment), `days`, true);
	const diffAtEnd = moment(+component.endMeasure.targetMoment).diff(moment(+component.endMeasure.moment), `seconds`, true);
	const diffAtStart = moment(+component.startMeasure.targetMoment).diff(moment(+component.startMeasure.moment), `seconds`, true);
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
