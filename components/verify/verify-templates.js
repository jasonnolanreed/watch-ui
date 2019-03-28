const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";
</style>
`
);

const makeHtml = (component) => (
`
<h1>Verifying Email Address...</h1>
<form>
	<input type="hidden" name="email" value="${component.email}">
	<input type="hidden" name="verificationCode" value="${component.verificationCode}">
</form>
`
);

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
