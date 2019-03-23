import {roundToTwoDecimals} from '../../utilities/number.js';

const makeHtml = (component) => (
`
<h1><i class="material-icons inline">flag</i> Measure Interval</h1>
<h3>
	<span class="nowrap">${moment(+component.startMeasure.targetMoment).format(`MMM Do, hh:mm a`)}</span>
	${` `}-${` `}
	<span class="nowrap">${moment(+component.endMeasure.targetMoment).format(`MMM Do, hh:mm a`)}</span>
</h3>
<div>
	<em>Duration:</em> ${getDuration(component)}
</div>
<p>
	<em>Rate:</em> <span class="rate ${getRate(component) >= 0 ? `fast` : `slow`}">${getRate(component)} seconds/day</span>
</p>
<button class="button" type="button" onclick="history.back();">Back</button>
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.rate.fast:before { content: "+"; }
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

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
