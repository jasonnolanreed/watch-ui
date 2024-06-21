import { Format } from '../../utilities/date-time.js';
import { getMomentDiffFromMeasure } from '../../utilities/measure.js';
import { roundToOneDecimal } from '../../utilities/number.js';
import { getIconNameForPosition, getPositionNameForMeasure } from '../../utilities/position.js';
const makeHtml = (component) => (String.raw `
${component.preferences.showTimegrapherFeatures ? String.raw `
<a class="back-link" href="#/watches/${component.watch._id}">
	<gwbw-icon name="arrow_back"></gwbw-icon>
	<span class="label">Back to watch</span>
</a>
` : ``}

<div class="page-title">
	<gwbw-icon name="insert_chart"></gwbw-icon>
	<div>
		<h1>Sessions</h1>
		<h2>${component.watch.name}</h2>
	</div>
</div>
<div class="feature-box edge-to-edge-container">
	${showSessionsInfo(component)}
	${showSessionsSelection(component)}
	${showDeviationGraph(component)}
	<gwbw-session-total
		session="${encodeURI(JSON.stringify(component.currentSession))}"
		goodtoleranceplus="${component.watch.goodTolerancePlus}"
		goodtoleranceminus="${component.watch.goodToleranceMinus}"
	></gwbw-session-total>
</div>
<br/>
${showSessionIntervalLink(component)}
${showSortControls(component)}
<div class="reverse-order">
	<div class="sticky-outer">
		<div class="sticky-inner">
			<a href="#/watches/measure/${component.watch._id}" class="big-link positive">
				<gwbw-icon name="add_circle"></gwbw-icon>
				<span>Add New Measure</span>
			</a>
		</div>
	</div>
	<form class="measures-form">
	${showMeasures(component)}
	</form>
</div>
`);
const showSessionsInfo = (component) => {
    if (!component.measures || !component.measures.length) {
        return ``;
    }
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
const showSessionsSelection = (component) => {
    if (component.sessions.length < 2) {
        return ``;
    }
    return String.raw `
	<p class="session-selection form-controls">
		<button class="previous-session button compact low-priority" ${getPreviousDisabled(component)} title="Previous session"><gwbw-icon name="arrow_back"></gwbw-icon></button>
		<button class="next-session button compact low-priority" ${getNextDisabled(component)} title="Next session"><gwbw-icon name="arrow_forward"></gwbw-icon></button>
		<small class="pages">(${component.currentSessionIndex + 1} of ${component.sessions.length})</small>
	</p>
	`;
};
const showDeviationGraph = (component) => (String.raw `
<gwbw-deviation-graph
	measures="${encodeURI(JSON.stringify(component.currentSession))}"
	watch="${encodeURI(JSON.stringify(component.watch))}"
></gwbw-deviation-graph>
`);
const showSessionIntervalLink = (component) => {
    if (!component.currentSession || component.currentSession.length < 2) {
        return ``;
    }
    const session = component.currentSession;
    const intervalHref = `#/measure/interval/${session[0]._id}/${session[session.length - 1]._id}`;
    return String.raw `
	<br/>
	<a href="${intervalHref}" class="session-interval-link">
		<span>
			<gwbw-icon name="straighten"></gwbw-icon>
			<gwbw-icon name="arrow_right_alt"></gwbw-icon>
			<gwbw-icon name="straighten"></gwbw-icon>
		</span>
		<span>
			View position data for session
		</span>
	</a>
	<br/>
	<br/>
	`;
};
const getPreviousDisabled = (component) => component.currentSessionIndex === 0 ? `disabled` : ``;
const getNextDisabled = (component) => component.currentSessionIndex === (component.sessions.length - 1) ? `disabled` : ``;
const showMeasures = (component) => {
    if (!component.measures || !component.measures.length) {
        return ``;
    }
    let html = ``;
    html += String.raw `
	<div class="list-headers">
		<div class="header-date-time">Pos/Date/Time</div>
		<div class="header-deviation">Deviation</div>
	</div>
	`;
    html += String.raw `<ul class="list measures-list">`;
    component.currentSessionSorted.forEach((measure, index) => {
        html += String.raw `
		<li class="list-item
			${measure.firstOfDay ? component.preferences.measuresSort.includes('Asc') ? `separation-above` : `separation-below` : ``}"
			measure-id="${measure._id}"
		>
			<button class="interval ${component.currentSession.length < 2 ? `invisible` : ``} button positive ultra-compact" measure-index="${index}">
				<gwbw-icon class="interval-other" name="straighten" title="Select interval"></gwbw-icon>
				<gwbw-icon class="interval-start" name="straighten" title="Deselect interval"></gwbw-icon>
			</button>
			<a
				class="date-time"
				href="#/measure/${measure._id}"
				title="Position: ${getPositionNameForMeasure(measure, component?.customPositions)}"
			>
				<span class="measure-position">${showPositionIcon(measure)}</span>
				${Format.dateAndTimeCompact(measure.targetMoment)}
				${measure.note.length ?
            `<gwbw-icon class="has-note" name="email" title="Note: ${measure.note}"></gwbw-icon>` :
            ``}
			</a>
			<div class="controls nowrap ${getMomentDiffFromMeasure(measure) < 0 ? `slow` : `fast`}">
				<span class="measure-deviation">${roundToOneDecimal(getMomentDiffFromMeasure(measure))}s</span>
				<a
					class="edit-button button positive-inverse ultra-compact"
					href="#/measure/${measure._id}"
				>
					<gwbw-icon name="tune"></gwbw-icon>
					<span>Edit</span>
				</a>
			</div>
		</li>
		`;
    });
    html += `</ul>`;
    return html;
};
const showPositionIcon = (measure) => {
    if (measure.customPositionId) {
        return String.raw `<gwbw-icon name="account_circle"></gwbw-icon>`;
    }
    else {
        return String.raw `<gwbw-icon name="${getIconNameForPosition(measure.position)}"></gwbw-icon>`;
    }
};
const showSortControls = (component) => {
    if (!component.currentSessionSorted || component.currentSessionSorted.length < 2) {
        return ``;
    }
    return String.raw `
	<div class="sort-controls">
		<label><b>Sort:</b></label>
		<nav class="toggle-buttons" aria-label="Sort measures">
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
		</nav>
	</div>
	`;
};
const makeCss = (component) => (String.raw `
<style>
.session-selection.session-selection { display: flex; align-items: center; gap: 0.1rem; margin: -0.5em 0 1em 0; }
.session-selection .pages { margin-left: 1rem; }
.previous-session gwbw-icon, .next-session gwbw-icon { font-size: 1.4em; }
button.next-session { margin-left: 0.35rem !important; }
.header-date-time { margin-left: 2.65rem; }
.header-deviation { margin-right: 4.2rem; }
.good-bad-message h4 { margin-bottom: 0; }
.measure-position { font-size: 1.5rem; color: var(--graphite); margin-right: 0.2rem; }
.has-note { font-size: 1.3rem; color: var(--bad); margin-left: 0.4rem; }
.session-interval-link, .session-interval-link > * { display: inline-flex; align-items: center; gap: 4px; }
.session-interval-link, .session-interval-link:hover { text-decoration: none; }
.session-interval-link gwbw-icon[name="straighten"] { font-size: 1.4em; transform: rotate(90deg); }
.session-interval-link gwbw-icon[name="arrow_right_alt"] { font-size: 2.4em; margin: 0 -0.45em; transform: scaleX(0.7); }
.date-time { display: flex; align-items: center; font-size: 0.9em; margin-right: 1em; }
.controls { display: flex; align-items: center; color: var(--charcoal); }
.controls.fast:before { content: "+"; }
.edit-button > * { font-size: 0.9rem !important; }
.reverse-order {
	display: flex;
	flex-direction: column-reverse;

}
.sort-controls { display: flex; justify-content: flex-end; align-items: center; gap: 10px; margin: 1em 0 2em; }
.sort-controls .toggle-buttons button.selected { pointer-events: none; }
.measures-form {
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
	min-width: 2.25rem !important;
	width: 2.25rem !important;
	max-width: 2.25rem !important;
	min-height: 2.25rem !important;
	height: 2.25rem !important;
	max-height: 2.25rem !important;
	margin-left: 0 !important;
	margin-right: 0.5rem !important;
	overflow: hidden;
}
.interval gwbw-icon { margin: 0 !important; transform: rotate(90deg); }
.interval:not(.interval-start) .interval-start { display: none; }
.interval.interval-start .interval-other { display: none; }
.measures-list.interval-start .interval:not(.interval-start) gwbw-icon svg {
	animation: entice 1.2s cubic-bezier(.36, .07, .19, .97) infinite;
}
@keyframes entice {
	10%, 90% {
		transform: rotate(3deg);
	}
	20%, 80% {
		transform: rotate(-6deg);
	}
	30%, 50%, 70% {
		transform: rotate(6deg);
	}
	40%, 60% {
		transform: rotate(-3deg);
	}
}
</style>
`);
export const makeTemplate = (component) => {
    return makeCss(component) + makeHtml(component);
};
