import {Format} from '../../utilities/date-time.js';
import {getMomentDiffFromMeasure} from '../../utilities/measure.js';
import {roundToOneDecimal} from '../../utilities/number.js';
import {getIconNameForPosition, getPositionNameForMeasure, positionsMap} from '../../utilities/position.js';

const makeHtml = (component) => (
`
${component.preferences.showTimegrapherFeatures ? `
<a class="back-link" href="#/watches/${component.watch._id}">
	<gwbw-icon name="arrow_back"></gwbw-icon><span>Back to watch</span>
</a>
` : ``}

<div class="page-title">
	<gwbw-icon name="insert_chart"></gwbw-icon>
	<div>
		<h1>Sessions</h1>
		<h3>${component.watch.name}</h3>
	</div>
</div>
${showSessionsInfo(component)}
${showSessionsSelection(component)}
${showDeviationGraph(component)}
<gwbw-session-total
	session="${encodeURI(JSON.stringify(component.currentSession))}"
	goodtoleranceplus="${component.watch.goodTolerancePlus}"
	goodtoleranceminus="${component.watch.goodToleranceMinus}"
></gwbw-session-total>
${showSessionIntervalLink(component)}
${showSortControls(component)}
<div class="reverse-order">
	<div class="sticky-controls-outer">
		<div class="sticky-controls">
			<div class="sticky-controls-inner">
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
html += `<span class="nowrap">${startDate}</span>`;
	if (startDate !== endDate) {
		html += ` - <span class="nowrap">${endDate}</span>`;
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

const showDeviationGraph = component => (
`
<gwbw-deviation-graph
	measures="${encodeURI(JSON.stringify(component.currentSession))}"
	watch="${encodeURI(JSON.stringify(component.watch))}"
></gwbw-deviation-graph>
`
);

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
		return ``;
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
			<div class="controls nowrap ${getMomentDiffFromMeasure(measure) < 0 ? `slow` : `fast`}">
				<span class="measure-deviation">${roundToOneDecimal(getMomentDiffFromMeasure(measure))}s</span>
				<a href="#/measure/${measure._id}"
					class="button ultra-compact view-measure ${measure.note.length ? `marked` : ``}"
					${measure.note.length ?
					`title="${measure.note}"` :
					`title="${getPositionNameForMeasure(measure, component?.customPositions)}"`
					}
				>
					${showPositionIcon(measure)}
				</a>
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

const showPositionIcon = measure => {
	if (measure.customPositionId) {
		return `<gwbw-icon name="account_circle"></gwbw-icon>`;
	} else {
		return `<gwbw-icon name="${getIconNameForPosition(measure.position)}"></gwbw-icon>`;
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
			<button type="button"
				class="Desc ${component.preferences.measuresSort.includes('Desc') ? 'selected' : ''}"
				${component.preferences.measuresSort.includes('Desc') && 'tabindex="-1" style="pointer-events: none;"'}
			>
				New First
				<gwbw-icon name="expand_less"></gwbw-icon>
			</button>
			<button type="button"
				class="Asc ${component.preferences.measuresSort.includes('Asc') ? 'selected' : ''}"
				${component.preferences.measuresSort.includes('Asc') && 'tabindex="-1" style="pointer-events: none;"'}
			>
				Old First
				<gwbw-icon name="expand_more"></gwbw-icon>
			</button>
		</div>
	</div>
	`;
};

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.session-selection.session-selection { display: flex; align-items: center; margin: -0.5em 0 2em 0; }
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
.reverse-order {
	display: flex;
	flex-wrap: wrap;
}
.measures-form {
	order: 1;
	width: 100%;
	margin-bottom: 1em;
}
.sticky-controls-outer {
	order: 2;
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
.sort-controls .toggle-buttons button.selected { pointer-events: none; }
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
