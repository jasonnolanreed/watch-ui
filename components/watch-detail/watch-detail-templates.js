const makeHtml = (component) => (
`
<h1>${component.watch.name}</h1>
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
.slow { color: var(--red); }
.fast { color: var(--green); }
.fast:before { content: "+"; }
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
		<div>Deviation</div>
	</div>
	`;
	html += `<ul class="list">`;
	component.currentSession.forEach(measure => {
		html += `
		<li class="list-item">
			<div>${moment(+measure.moment).format(`MMM Do, hh:mm a`)}</div>
			<div class="${(component.getMomentDiff(measure) < 0) ? `slow` : `fast`}">${component.getMomentDiff(measure)}s</div>
		</li>
		`;
	});
	html += `</ul>`;
	return html;
};

const showSessionTotal = component => {
	if (!component.measures || !component.measures.length) { return ``; }
	if (component.getSessionTotal()) {
		return `<h2 class="total">${component.getSessionTotal()}</h2>`;
	} else {
		return `<p>Average rate for session will be shown here when multiple measurements are taken over a 12+ hour period</p>`;
	}
};

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
