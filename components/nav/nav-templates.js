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
	padding: 1.75em 0;
	color: #fff;
	background-color: var(--dark-blue);
	box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
}

.content {
	display: flex;
	justify-content: flex-start;
	max-width: 800px;
	margin: 0 auto;
	padding: 0 2em;
}

a, a:visited {
	padding: 1.75em;
	margin: -1.75em;
	font-weight: bold;
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

.material-icons {
	position: relative;
	top: 0.25em;
	font-size: 1.5em;
	line-height: 0;
}

.login, .logout, .register {
	margin-left: auto;
}
</style>
`
);

const getLinks = component => {
	if (!component.loggedIn) {
		if (component.isLoginView) {
			return `<a class="register" href="#/register">Register <i class="material-icons">account_box</i></a>`;
		} else {
			return `<a class="login" href="#/login">Login <i class="material-icons">exit_to_app</i></a>`;
		}
	}
	return `
	<a class="watches" href="#/watches"><i class="material-icons">watch</i> Watches</a>
	<a class="logout" href="javascript:void(0);">Logout <i class="material-icons">exit_to_app</i></a>
	`;
};

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
