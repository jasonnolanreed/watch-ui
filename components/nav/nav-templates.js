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
	padding: .75em 0;
	color: #fff;
	background-color: var(--dark-blue);
}

.content {
	display: flex;
	justify-content: flex-start;
	max-width: 800px;
	margin: 0 auto;
	padding: 0 2em;
	position: relative;
	top: -0.1em;
}

a, a:visited {
	padding: 1.75em;
	margin: -1.75em;
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
	position: relative;
	top: 0.1em;
	font-size: 1.5em;
	line-height: 0;
}

.login, .register, .preferences {
	margin-left: auto;
}
</style>
`
);

const getLinks = component => {
	if (!component.loggedIn) {
		if (component.isLoginView) {
			return `<a class="register" href="#/register">Register <gwbw-icon name="account_box"></gwbw-icon></a>`;
		} else {
			return `<a class="login" href="#/login">Login <gwbw-icon name="exit_to_app"></gwbw-icon></a>`;
		}
	}
	return `
	<a class="watches" href="#/watches"><gwbw-icon name="watch"></gwbw-icon> Watches</a>
	<a class="preferences" href="#/preferences">Preferences <gwbw-icon name="settings"></gwbw-icon></a>
	`;
};

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
