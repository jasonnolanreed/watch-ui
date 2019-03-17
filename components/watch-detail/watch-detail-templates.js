const makeHtml = (component) => (
`
<h1>${component.watch.name}</h1>
${showMeasures(component)}
${showSessionTotal(component)}
<a href="#/watches/measure/${component.watch._id}" class="button">Take Measurement</a>
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

.slow { color: var(--red); }
.fast { color: var(--green); }
.fast:before { content: "+"; }
</style>
`
);

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
	component.measures.forEach(measure => {
		html += `
		<li class="list-item">
			<div>${component.getTimestamp(measure)}</div>
			<div class="${component.getMomentDiffClass(measure)}">${component.getMomentDiff(measure)}s</div>
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
