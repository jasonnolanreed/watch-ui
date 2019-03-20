import {getIconNameForPosition} from '../../utilities/position.js';

const makeHtml = (component) => (
`
<h1><i class="material-icons inline">insert_chart</i> ${component.watch.name}</h1>
${showSessionsInfo(component)}
${showSessionsSelection(component)}
${showMeasures(component)}
${showSessionTotal(component)}
<a href="#/watches/measure/${component.watch._id}" class="button">Take Measurement</a>
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.session-selection { margin: -16px 0 30px 0; }
.session-selection i { font-weight: 900; }
.controls { display: flex; align-items: center; }
.controls.slow { color: var(--red); }
.controls.fast { color: var(--green); }
.controls.fast:before { content: "+"; }
.deviation { display: flex; align-items: flex-end; }
.deviation .button { margin-left: 0.5em; }
.total.fast .number:before { content: "+"; }
.short-session-alert {
	display: flex;
	justify-items: flex-start;
	align-items: center;
	margin-top: -10px;
	color: var(--red);
}
.short-session-alert i { margin-right: 0.5em; }
</style>
`
);

const showSessionsInfo = component => {
	if (!component.measures || !component.measures.length) { return ``; }
	let html = `<h3>Session: `;
	const startDate = moment(+component.currentSession[0].moment).format(`MMM Do`);
	const endDate = moment(+component.currentSession[component.currentSession.length - 1].moment).format(`MMM Do`);
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
	<p class="session-selection">
		<button class="previous-session button compact ${getPreviousDisabled(component)}"><i class="material-icons">arrow_back</i></button>
		<button class="next-session button compact ${getNextDisabled(component)}"><i class="material-icons">arrow_forward</i></button>
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
		<div>Date, Time</div>
		<div class="deviation">
			Deviation
			<button class="invisible button ultra-compact"><i class="material-icons">account_box</i></button>
			<button class="invisible button ultra-compact"><i class="material-icons">account_box</i></button>
		</div>
	</div>
	`;
	html += `<ul class="list">`;
	component.currentSession.forEach(measure => {
		html += `
		<li class="list-item" measure-id="${measure._id}">
			<div>${moment(+measure.moment).format(`MMM Do, hh:mm a`)}</div>
			<div class="controls nowrap ${(component.getMomentDiff(measure) < 0) ? `slow` : `fast`}">
				${component.getMomentDiff(measure)}s
				<button class="button ultra-compact view-measure ${(_ => measure.note.length ? `positive` : ``)()}" measure-id="${measure._id}">
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
	if (sessionTotalData) {
		let html = `<h2 class="total ${(_ => sessionTotalData.averageRate < 0 ? 'slow' : 'fast')()}">Average: <span class="number">${sessionTotalData.averageRate}</span> seconds/day</h2>`;
		if (sessionTotalData.sessionDistance < 0.5) {
			html += `
			<p class="short-session-alert">
				<i class="material-icons">warning</i>
				<span>This average is prone to inaccuracy because of the short session. Sessions of 12+ hours provide better results.</span>
			</p>
			`;
		}
		return html;
	} else {
		return `<p>Average rate will be shown here when multiple measurements are taken within this session.</p>`;
	}
};

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
