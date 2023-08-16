const makeHtml = (component) => (
`
<div class="page-title">
	<gwbw-icon name="account_circle"></gwbw-icon>
	<h1>Custom Positions</h1>
</div>

<ul class="list">
	${showPositions(component)}
</ul>

<br/>

<button class="add-position button positive">
	<gwbw-icon name="add_circle"></gwbw-icon>
	Add Custom Position
</button>
`
);

const showPositions = component => {
	let html = ``;
	for (const position of component.customPositions) {
		html += `
		<li class="list-item spacious">
			<div>${position.name}</div>
			<div class="controls no-wrap">
				<button position-name="${position.name}" position-id="${position._id}" class="edit-position button ultra-compact">
					<gwbw-icon name="settings"></gwbw-icon>
				</button>
				<button position-id="${position._id}" class="delete-position button negative ultra-compact">
					<gwbw-icon name="delete"></gwbw-icon>
				</button>
			</div>
		</li>
		`;
	}
	return html;
};

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";
</style>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
	