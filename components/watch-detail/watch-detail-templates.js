import {Format} from '../../utilities/date-time.js';
import {roundToTwoDecimals} from '../../utilities/number.js';
import {getIconNameForPosition} from '../../utilities/position.js';

const makeHtml = (component) => (
`
<div class="page-title">
	<gwbw-icon name="insert_chart"></gwbw-icon>
	<h1>${component.watch.name}</h1>
</div>
${showSessionsInfo(component)}
${showSessionsSelection(component)}
${showDeviationGraph(component)}
${showSessionTotal(component)}
${showSessionIntervalLink(component)}
${showSortControls(component)}
<div class="reverse-order">
	<div class="new-measure-outer">
		<div class="new-measure">
			<div class="new-measure-inner">
				<a href="#/watches/measure/${component.watch._id}" class="big-link">Add New Measure</a>
			</div>
		</div>
	</div>
	<form class="measures-form">
	${showMeasures(component)}
	</form>
</div>
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
		<button class="previous-session button compact low-priority" ${getPreviousDisabled(component)}><gwbw-icon name="arrow_back"></gwbw-icon></button>
		<button class="next-session button compact low-priority" ${getNextDisabled(component)}><gwbw-icon name="arrow_forward"></gwbw-icon></button>
		<small class="pages">(${component.currentSessionIndex + 1} of ${component.sessions.length})</small>
	</p>
	`;
};

const showDeviationGraph = component => {
	if (!component.currentSession || component.currentSession.length < 2) { return ``; }
	return `
	<gwbw-deviation-graph
		measures="${encodeURI(JSON.stringify(component.currentSession))}"
		watch="${encodeURI(JSON.stringify(component.watch))}"
	></gwbw-deviation-graph>
	`;
};

const showSessionIntervalLink = component => {
	if (!component.currentSession || component.currentSession.length < 2) { return ``; }
	const session = component.currentSession;
	const intervalHref =
		`#/measure/interval/${session[0]._id}/${session[session.length -1]._id}`;
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
		<div class="header-date-time">Date, Time</div>
		<div class="header-deviation">Deviation</div>
	</div>
	`;
	html += `<ul class="list measures-list">`;
	component.currentSessionSorted.forEach((measure, index) => {
		html += `
		<li class="list-item
			${measure.firstOfDay ? component.preferences.measuresSort.includes('Asc') ? `separation-above` : `separation-below` : ``}"
			measure-id="${measure._id}"
		>
			<button class="interval ${component.currentSession.length < 2 ? `invisible` : ``} sneaky-button" measure-index="${index}">
				<gwbw-icon class="interval-other" name="straighten"></gwbw-icon>
				<gwbw-icon class="interval-start" name="straighten"></gwbw-icon>
			</button>
			<a class="date-time" href="#/measure/${measure._id}">
				${Format.dateAndTimeCompact(measure.targetMoment)}
			</a>
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

const showSortControls = component => {
	if (!component.currentSessionSorted || component.currentSessionSorted.length < 2) {
		return ``;
	}

	return `
	<div class="sort-controls">
		<label>Sort:</label>
		<div class="toggle-buttons">
			<button type="button" class="Asc ${component.preferences.measuresSort.includes('Asc') ? 'selected' : ''}">
				Asc
				<gwbw-icon
					name="arrow_downward"
				></gwbw-icon>
			</button>
			<button type="button" class="Desc ${component.preferences.measuresSort.includes('Desc') ? 'selected' : ''}">
				Desc
				<gwbw-icon
					name="arrow_upward"
				></gwbw-icon>
			</button>
		</div>
	</div>
	`;
};

const getTotalClasses = (component, sessionTotalData) => {
	if (!sessionTotalData) { return ``; }
	let classes = [];
	if (sessionTotalData.averageRate < 0) {
		classes.push(`slow`);
	} else {
		classes.push(`fast`);
	}
	if (sessionTotalData.averageRate <= component.watch.goodTolerancePlus && sessionTotalData.averageRate >= -1 * component.watch.goodToleranceMinus) {
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

.session-selection.session-selection { display: flex; align-items: center; margin: -1em 0 2em 0; }
.session-selection .pages { margin-left: 1em; }
.previous-session gwbw-icon, .next-session gwbw-icon { font-size: 1.4em; }
.header-date-time { margin-left: 1.65em; }
.header-deviation { margin-right: 7.35em; }
.session-interval-link { margin-bottom: 2em; line-height: 1.4; }
.session-interval-link *, .session-interval-link:hover * { text-decoration: none; }
.session-interval-link gwbw-icon[name="straighten"] { font-size: 1.4em; transform: rotate(90deg); }
.session-interval-link gwbw-icon[name="arrow_right_alt"] { font-size: 2.4em; margin: 0 -0.45em 0 -.38em; position: relative; top: 0.16em; transform: scaleX(0.7); }
.date-time { display: flex; align-items: center; font-size: 0.9em; margin-right: 1em; }
.controls { display: flex; align-items: center; color: var(--light-blue); }
.controls.fast:before { content: "+"; }
.total.good-watch { color: var(--green); }
.total.bad-watch { color: var(--red); }
.total.fast .number:before { content: "+"; }
.good-bad-message > * { display: none; margin-top: -1rem; }
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
.reverse-order {
	display: flex;
	flex-wrap: wrap;
}
.new-measure-outer {
	order: 2;
	width: 100%;
}
.new-measure-outer[stuck] .new-measure {
	position: fixed;
	bottom: 0; left: 0; right: 0;
	padding: 1.5em 2em;
	background: #fff;
	box-shadow: 0 -1em 2em 0 rgba(0, 0, 0, 0.2);
	z-index: 2;
}
.new-measure-outer[stuck] .new-measure-inner {
	width: 100%;
	margin: 0 auto;
	max-width: calc(800px - 4em);
}
.measures-form {
	order: 1;
	width: 100%;
	margin-bottom: 1em;
}
.measures-list .list-item {
	justify-content: flex-start;
}
.measures-list .list-item .controls {
	margin-left: auto;
}
.interval.interval {
	font-size: 1.65em;
	color: var(--blue);
	margin-left: -0.6em;
	padding: 0.125em 0.35em;
	padding-right: 0.2em;
	opacity: 0.35;
	cursor: pointer;
	z-index: 1;
}
.sort-controls { display: flex; justify-content: flex-end; align-items: center; gap: 10px; margin: 1em 0 2em; color: var(--blue); }
.sort-controls .toggle-buttons button.selected { cursor: default; }
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
