import {Format} from '../../utilities/date-time.js';
import {roundToTwoDecimals} from '../../utilities/number.js';
import {getIconNameForPosition} from '../../utilities/position.js';

const makeHtml = (component) => (
`
<h1><gwbw-icon name="insert_chart"></gwbw-icon> ${component.watch.name}</h1>
${showSessionsInfo(component)}
${showSessionsSelection(component)}
${showSessionIntervalLink(component)}
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
		<button class="previous-session button compact low-priority ${getPreviousDisabled(component)}"><gwbw-icon name="arrow_back"></gwbw-icon></button>
		<button class="next-session button compact low-priority ${getNextDisabled(component)}"><gwbw-icon name="arrow_forward"></gwbw-icon></button>
	</p>
	`;
};

const showSessionIntervalLink = component => {
	if (component.currentSession.length < 2) { return ``; }
	const session = component.currentSession;
	const intervalHref =
		`#/measure/interval/${session[0]._id}/${session[session.length  -1]._id}`;
	return `
	<div class="session-interval-link">
		<a href="${intervalHref}">
			<gwbw-icon name="straighten"></gwbw-icon>
			<gwbw-icon name="arrow_right_alt"></gwbw-icon>
			<gwbw-icon name="straighten"></gwbw-icon>
			View Position Data for Session
		</a>
	</div>
	`;
}

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
		<gwbw-icon class="invisible interval" name="straighten"></gwbw-icon>
			Date, Time
		</div>
		<div class="header-deviation">
			Deviation
			<button class="invisible button ultra-compact"><gwbw-icon name="account_box"></gwbw-icon></button>
			<button class="invisible button ultra-compact"><gwbw-icon name="account_box"></gwbw-icon></button>
		</div>
	</div>
	`;
	html += `<ul class="list measures-list">`;
	component.currentSession.forEach((measure, index) => {
		html += `
		<li class="list-item ${measure.firstOfDay ? `separation-above` : ``}" measure-id="${measure._id}">
			<div class="date-time">
				<span class="interval ${component.currentSession.length < 2 ? `invisible` : ``}" measure-index="${index}">
					<gwbw-icon class="interval-other" name="straighten"></gwbw-icon>
					<gwbw-icon class="interval-start" name="straighten"></gwbw-icon>
				</span>
				${Format.dateAndTime(measure.targetMoment)}
			</div>
			<div class="controls nowrap ${component.getMomentDiff(measure) < 0 ? `slow` : `fast`}">
				<span class="measure-deviation">${roundToTwoDecimals(component.getMomentDiff(measure))}s</span>
				<button class="button ultra-compact view-measure ${measure.note.length ? `marked` : ``}" measure-id="${measure._id}">
					<gwbw-icon name="${getIconNameForPosition(measure.position)}"></gwbw-icon>
				</button>
				<button class="button negative ultra-compact delete-measure" measure-id="${measure._id}">
					<gwbw-icon name="delete"></gwbw-icon>
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
				<gwbw-icon name="warning"></gwbw-icon>
				<span>This average is prone to inaccuracy because of the short session. Sessions of 12+ hours provide better results.</span>
			</p>
			`;
		} else {
			html +=
			`
			<div class="good-bad-message ${totalClasses}">
				<h4 class="good"><gwbw-icon name="thumb_up"></gwbw-icon> Good watch</h4>
				<h4 class="bad"><gwbw-icon name="thumb_down"></gwbw-icon> Bad watch</h4>
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

.session-selection { margin: -1em 0 2em 0; }
.previous-session gwbw-icon, .next-session gwbw-icon { font-size: 1.4em; }
.date-time { display: flex; align-items: center; line-height: 1.8; }
.header-deviation { display: flex; align-items: flex-end; }
.header-deviation .button { margin-left: 0.5em; }
.session-interval-link { margin-bottom: 0.5em; line-height: 1.4; }
.session-interval-link *, .session-interval-link:hover * { text-decoration: none; }
.session-interval-link gwbw-icon[name="straighten"] { font-size: 1.4em; transform: rotate(90deg); }
.session-interval-link gwbw-icon[name="arrow_right_alt"] { font-size: 2.4em; margin: 0 -0.45em 0 -.38em; position: relative; top: 0.16em; transform: scaleX(0.7); }
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
	margin-top: -0.8em;
	color: var(--red);
}
.short-session-alert gwbw-icon { font-size: 1.5em; margin-right: 0.5em; }
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
.interval gwbw-icon { transform: rotate(90deg); }
.interval:not(.interval-start) .interval-start { display: none; }
.interval.interval-start .interval-other { display: none; }
.measures-list.interval-start .interval { opacity: 1; }
.measures-list.interval-start .interval.interval-start gwbw-icon { color: var(--green); }
.measures-list.interval-start .interval:not(.interval-start) gwbw-icon {
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
