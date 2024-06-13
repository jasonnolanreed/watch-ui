export const makeTemplate = (component) => (`
<style>
:host {
	container-name: cq-guide;
	container-type: inline-size;
}
</style>

<div class="page-title">
	<gwbw-icon name="info"></gwbw-icon>
	<h1>Guide</h1>
</div>
`);
