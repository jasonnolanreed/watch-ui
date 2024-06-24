const makeHtml = (component) => (String.raw `
<div class="tabs">
	<div class="tabs-inner">
		<a
			class="tab ${component.selectedData === `sessions` ? `selected` : ``}"
			href="/#/sessions/${component.watchData._id}"
		>
			<gwbw-icon name="insert_chart"></gwbw-icon>
			<span>Sessions</span>
		</a>
		${component.preferencesData.showTimegrapherFeatures ?
    String.raw `
		<a
			class="tab ${component.selectedData === `timegrapher` ? `selected` : ``}"
			href="/#/timegrapher/${component.watchData._id}">
			<gwbw-icon name="precision_manufacturing"></gwbw-icon>
			<span>Timegrapher</span>
		</a>
		`
    : ``}
		<a
			class="tab ${component.selectedData === `details` ? `selected` : ``}"
			href="/#/watches/${component.watchData._id}"
		>
			<gwbw-icon name="watch"></gwbw-icon>
			<span>Details</span>
		</a>
	</div>
</div>
`);
const makeCss = (component) => (String.raw `
<style>
.tabs {
	width: var(--width);
	margin: 3rem var(--negative-margin) 0 var(--negative-margin);
	box-shadow: 0 -1.5rem 1.5rem rgba(0, 0, 0, 0.07);
	position: relative;
	z-index: 4;

	--width: calc(100% + (2 * var(--layout-padding-large)));
	--negative-margin: calc(-1 * var(--layout-padding-large));
}

.tabs-inner {
	display: flex;
	justify-content: stretch;
	overflow: hidden;
	position: relative;
	z-index: 4;
}

.tab {
	position: relative;
	flex: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.25rem;
	padding: 1.25rem 0.2rem;
	font-size: 1rem;
	text-align: center;
	text-wrap: nowrap;
	background-color: var(--almost-white);
	border-top: 1px solid rgba(0, 0, 0, 0.05);
	text-decoration: none !important;
	z-index: 4;
}

.tab gwbw-icon {
	font-size: 1.2rem;
	color: var(--good);
}

.tab.selected {
	background-color: #fff;
	color: var(--charcoal) !important;
	box-shadow: 0 0 1rem rgba(0, 0, 0, 0.24);
	z-index: 5;
	pointer-events: none;
}

.tab:not(.selected) {
	box-shadow: inset 0 -0.5rem 1rem -0.75rem rgba(0, 0, 0, 0.2);
}

.tab:after {
	content: "";
	position: absolute;
	top: 0; right: 0; bottom: 0; left: 0;
	background-color: var(--good);
	opacity: 0;
	transition: 0.4s opacity ease;
}

.tab:hover:after {
	opacity: 0.075;
}

.tab:not(.selected) + .tab:not(.selected) {
	border-left: 1px solid rgba(0, 0, 0, 0.05);
}

/* DEV NOTE: These media queries should stay in sync with layouts.css */
@media (max-width: 900px) {
	.tabs {
		--width: calc(100% + (2 * var(--layout-padding-xsmall))) !important;
		--negative-margin: calc(-1 * var(--layout-padding-xsmall)) !important;
	}
}
</style>
`);
export const makeTemplate = (component) => {
    return makeCss(component) + makeHtml(component);
};
