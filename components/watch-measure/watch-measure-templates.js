const makeHtml = (component) => (
`
<h1>Measure ${component.watch.name}</h1>
<form>
	<div class="form-input">
		<h2 class="target-time">
		${component.date.getHours()}:${component.date.getMinutes()}
		</h2>
	</div>
	<div class="form-controls">
		<a href="/#/watches/detail/${component.watch._id}" class="button negative">Cancel</a>
		<button type="button" class="button positive">Now!</button>
	</div>
</form>
`
);

const makeCss = (component) => (
`
<style>
@import "/styles/global-styles.css";

.target-time {
	color: var(--green);
}
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
