import {Format} from '../../utilities/date-time.js';
import {roundToTwoDecimals} from '../../utilities/number.js';
import {getIconNameForPosition} from '../../utilities/position.js';

const makeHtml = (component) => (
`
<h1><i class="material-icons inline">insert_chart</i> ${component.watch.name}</h1>
${showSessionsInfo(component)}
${showSessionsSelection(component)}
<form>
	${showMeasures(component)}
</form>
${showSessionTotal(component)}
<a href="#/watches/measure/${component.watch._id}" class="big-link">Add New Measure</a>
`
);

const showSessionsInfo = component => {
	if (!component.measures || !component.measures.length) { return ``; }
	let html = `<h3>Session: `;
	const startDate = Format.date(component.currentSession[0].targetMoment);
	const endDate = Format.date(component.currentSession[component.currentSession.length - 1].targetMoment);
	html += startDate;
	if (startDate !== endDate) {
		html += ` - ${endDate}`;
	}
	html += `</h3>`;
	return html;
};

const showSessionsSelection = component => {
	if (component.sessions.length < 2) { return ``; }
	return `
	<p class="session-selection form-controls">
		<button class="previous-session button compact low-priority ${getPreviousDisabled(component)}"><i class="material-icons">arrow_back</i></button>
		<button class="next-session button compact low-priority ${getNextDisabled(component)}"><i class="material-icons">arrow_forward</i></button>
	</p>
	`;
};

const getPreviousDisabled = component => component.currentSessionIndex === 0 ? `disabled` : ``;
const getNextDisabled = component => component.currentSessionIndex === (component.sessions.length - 1) ? `disabled` : ``;

const showMeasures = component => {
	if (!component.measures || !component.measures.length) {
		return `<p>This watch hasn't been measured yet</p>`;
	}
	let html = ``;
	html += `
	<div class="list-headers">
		<div>
		<i class="invisible interval material-icons inline">touch_app</i>
			Date, Time
		</div>
		<div class="header-deviation">
			Deviation
			<button class="invisible button ultra-compact"><i class="material-icons">account_box</i></button>
			<button class="invisible button ultra-compact"><i class="material-icons">account_box</i></button>
		</div>
	</div>
	`;
	html += `<ul class="list measures-list">`;
	component.currentSession.forEach((measure, index) => {
		html += `
		<li class="list-item ${measure.firstOfDay ? `separation-above` : ``}" measure-id="${measure._id}">
			<div class="date-time">
				<span class="interval ${component.currentSession.length < 2 ? `invisible` : ``}" measure-index="${index}">
					<i class="interval-other material-icons inline">straighten</i>
					<i class="interval-start material-icons inline">straighten</i>
				</span>
				${Format.dateAndTime(measure.targetMoment)}
			</div>
			<div class="controls nowrap ${component.getMomentDiff(measure) < 0 ? `slow` : `fast`}">
				<span class="measure-deviation">${roundToTwoDecimals(component.getMomentDiff(measure))}s</span>
				<button class="button ultra-compact view-measure ${measure.note.length ? `marked` : ``}" measure-id="${measure._id}">
					<i class="material-icons">${getIconNameForPosition(measure.position)}</i>
				</button>
				<button class="button negative ultra-compact delete-measure" measure-id="${measure._id}">
					<i class="material-icons">delete</i>
				</button>
			</div>
		</li>
		`;
	});
	html += `</ul>`;
	return html;
};

const showSessionTotal = component => {
	if (!component.measures || !component.measures.length) { return ``; }
	const sessionTotalData = component.getSessionTotalData();
	const totalClasses = getTotalClasses(component, sessionTotalData);
	if (sessionTotalData) {
		let html =
		`
		<h2 class="total ${totalClasses}">Average: <span class="number">${sessionTotalData.averageRate}</span> seconds/day</h2>
		`;
		if (sessionTotalData.sessionDistance < 0.5) {
			html += `
			<p class="short-session-alert">
				<i class="material-icons">warning</i>
				<span>This average is prone to inaccuracy because of the short session. Sessions of 12+ hours provide better results.</span>
			</p>
			`;
		} else {
			html +=
			`
			<div class="good-bad-message ${totalClasses}">
				<h4 class="good"><i class="material-icons inline">thumb_up</i> Good watch</h4>
				<h4 class="bad"><i class="material-icons inline">thumb_down</i> Bad watch</h4>
			</div>
			`;
		}
		return html;
	} else {
		return `<p>Average rate will be shown here when multiple measures are taken within this session.</p>`;
	}
};

const getTotalClasses = (component, sessionTotalData) => {
	if (!sessionTotalData) { return ``; }
	let classes = [];
	if (sessionTotalData.averageRate < 0) {
		classes.push(`slow`);
	} else {
		classes.push(`fast`);
	}
	if (Math.abs(sessionTotalData.averageRate) <= component.watch.goodTolerance) {
		classes.push(`good-watch`);
	} else {
		classes.push(`bad-watch`);
	}
	return classes.length ? classes.join(` `) : ``;
};

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.session-selection { margin: -16px 0 30px 0; }
.session-selection i { font-weight: bold; }
.date-time { display: flex; align-items: center; line-height: 1.8; }
.header-deviation { display: flex; align-items: flex-end; }
.header-deviation .button { margin-left: 0.5em; }
.controls { display: flex; align-items: center; color: var(--light-blue); }
.controls.fast:before { content: "+"; }
.total.good-watch { color: var(--green); }
.total.bad-watch { color: var(--red); }
.total.fast .number:before { content: "+"; }
.good-bad-message > * { display: none; margin-top: -1.5em; }
.good-bad-message.good-watch .good { display: block; color: var(--green); }
.good-bad-message.bad-watch .bad { display: block; color: var(--red); }
.short-session-alert {
	display: flex;
	justify-items: flex-start;
	align-items: center;
	margin-top: -10px;
	color: var(--red);
}
.short-session-alert i { margin-right: 0.5em; }
.interval.interval {
	font-size: 1.65em;
	padding: 0.5em 1.15em 0.5em 0.5em;
	margin: -0.7em -1em -0.7em -0.7em;
	opacity: 0.35;
	cursor: pointer;
	z-index: 1;
}
@media (hover: hover) {
	.interval:hover { opacity: 1; }
}
.interval i { transform: rotate(90deg); }
.interval:not(.interval-start) .interval-start { display: none; }
.interval.interval-start .interval-other { display: none; }
.measures-list.interval-start .interval { opacity: 1; }
.measures-list.interval-start .interval.interval-start i { color: var(--green); }
.measures-list.interval-start .interval:not(.interval-start) i {
	color: var(--blue);
	animation: entice 1.2s cubic-bezier(.36, .07, .19, .97) infinite;
}
@keyframes entice {
	10%, 90% {
		transform: rotate(93deg);
	}
	20%, 80% {
		transform: rotate(85deg);
	}
	30%, 50%, 70% {
		transform: rotate(96deg);
	}
	40%, 60% {
		transform: rotate(83deg);
	}
}
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
