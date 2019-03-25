const makeHtml = (component) => (
`
<nav>
	<div class="content">
		${getLinks(component)}
	</div>
</nav>
${component.birthday ?
`<img src="https://gifimage.net/wp-content/uploads/2017/11/it-is-your-birthday-gif-9.gif" style="padding: 1em 2em 0;">` :
``}
`
);

const makeCss = (component) => (
`
<style>
@import "styles/global-styles.css";

nav {
	padding: 1em 0;
	background-color: var(--dark-blue);
	color: #fff;
}

.content {
	display: flex;
	justify-content: flex-start;
	max-width: 800px;
	margin: 0 auto;
	padding: 0 2em;
}

a, a:visited {
	font-weight: 700;
	color: #fff;
	text-decoration: none;
}

a:hover {
	color: var(--light-blue);
	text-decoration: none;
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

.login, .logout {
	margin-left: auto;
}
</style>
`
);

const getLinks = component => {
	if (!component.loggedIn) {
		return `<a class="login" href="#/login">Login <i class="material-icons">exit_to_app</i></a>`;
	}
	return `
	<a class="watches" href="#/watches"><i class="material-icons">watch</i> Watches</a>
	<a class="logout" href="javascript:void(0);">Logout <i class="material-icons">exit_to_app</i></a>
	`;
};

export const makeTemplate = (component) => {
	return makeCss(component) + makeHtml(component);
};
