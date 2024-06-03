import {Verify} from "./verify";

const makeCss = (component: Verify) => (
`
<style>
@import "styles/global-styles.css";
</style>
`
);

const makeHtml = (component: Verify) => (
`
<div class="page-title">
	<gwbw-icon name="email"></gwbw-icon>
	<h1>Verifying Email Address...</h1>
</div>

<h1></h1>
<form>
	<input type="hidden" name="email" value="${component.email}">
	<input type="hidden" name="verificationCode" value="${component.verificationCode}">
</form>
`
);

export const makeTemplate = (component: Verify) => {
	return makeCss(component) + makeHtml(component);
};
