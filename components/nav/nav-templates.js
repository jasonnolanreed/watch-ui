const makeHtml = (component) => (
`
<nav>
	<div class="content">
		${getLinks(component)}
	</div>
</nav>
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

nav {
	padding: 0 2em;
	color: #fff;
	background-color: var(--dark-blue);
}

.content {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	max-width: 800px;
	margin: 0 auto;
}

a, a:visited {
	display: flex;
	align-items: center;
	padding: 1em 0;
	font-weight: 600;
	color: #fff;
	text-decoration: none;
}

@media (hover: hover) {
	a:hover {
		color: var(--light-blue);
		text-decoration: none;
	}
}

a:active {
	color: var(--bright-blue);
}

gwbw-icon {
	font-size: 1.5em;
}

.login, .register, .preferences {
	margin-left: auto;
}

span + gwbw-icon,
gwbw-icon + span {
	margin-left: 5px;
}
</style>
`
);

const getLinks = component => {
	if (!component.loggedIn) {
		if (component.isLoginView) {
			return `<a class="register" href="#/register"><span>Register</span><gwbw-icon name="account_box"></gwbw-icon></a>`;
		} else {
			return `<a class="login" href="#/login"><span>Login</span><gwbw-icon name="exit_to_app"></gwbw-icon></a>`;
		}
	}
	return `
	<a class="watches" href="#/watches"><gwbw-icon name="watch"></gwbw-icon><span>Watches</span></a>
	<a class="preferences" href="#/preferences"><span>Preferences</span><gwbw-icon name="settings"></gwbw-icon></a>
	`;
};

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
