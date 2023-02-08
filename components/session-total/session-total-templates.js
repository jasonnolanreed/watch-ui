import {getSessionTotalData} from "../../utilities/measure.js";

const makeHtml = (component) => {
	if (!component.sessionData || !component.sessionData.length) { return ``; }
	const sessionTotalData = getSessionTotalData(component.sessionData);
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
	if (sessionTotalData.averageRate <= component.goodTolerancePlusValue && sessionTotalData.averageRate >= -1 * component.goodToleranceMinusValue) {
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
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
