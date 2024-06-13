import {Guide} from "./guide";

export const makeTemplate = (component: Guide) => (
`
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
`
);
