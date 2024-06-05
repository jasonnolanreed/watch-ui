import {Header} from "./header";

const makeCss = (component: Header) => (
`
<style>
header {
}

.header-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 3rem;
	width: 100%;
	margin: 0 auto;

	container-type: inline-size;
	container-name: cq-header-container;
}

nav {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem 1rem;

	a {
		display: flex;
		align-items: center;
		gap: 0.2em;
		color: var(--dark-blue) !important;
		text-decoration: none !important;

		&[active] {
			text-decoration: underline !important;
		}
		gwbw-icon {}
	}

	a:hover {
		color: var(--blue) !important;
	}
}

.logo-container {
	img {
		display: none;
	}
}

hr {
	margin: 1.5rem 0 2rem 0 !important;
}

@container cq-header-container (width < 525px) {
	img.small-logo {
		display: block;
		width: 110px;
		max-width: 100%;
		height: auto;
		aspect-ratio: 385 / 120;
	}
}

@container cq-header-container (width >= 525px) {
	img.large-logo {
		display: block;
		width: 300px;
		max-width: 100%;
		height: auto;
		aspect-ratio: 2084 / 314;
	}
}
</style>
`
);

const makeHtml = (component: Header) => (
`
<header>
	<div class="header-container">
		<nav>
			${getLinks(component)}
		</nav>
		<div class="logo-container">
			<img
				class="large-logo"
				src="assets/images/logo.svg?v=2.2"
				alt="Good Watch Bad Watch Logo"
				loading="lazy"
			>
			<img
				class="small-logo"
				src="assets/images/logo-small.svg?v=2.2"
				alt="Good Watch Bad Watch Logo"
				loading="lazy"
			>
		</div>
	</div>
</header>
<hr>
`
);

const getLinks = (component: Header) => {
	if (!component.loggedIn) {
		return `
		<a class="login click-zone-05" href="#/login" ${component.viewName === 'login' ? 'active' : ''}>
			<gwbw-icon name="exit_to_app"></gwbw-icon>
			<span>Login</span>
		</a>
		<a class="register click-zone-05" href="#/register" ${component.viewName === 'register' ? 'active' : ''}>
			<gwbw-icon name="account_box"></gwbw-icon>
			<span>Register</span>
		</a>
		`;
	}
	return `
	<a class="watches click-zone-05" href="#/watches" ${component.viewName === 'watches' ? 'active' : ''}>
		<gwbw-icon name="watch"></gwbw-icon>
		<span>Watches</span>
	</a>
	<a class="preferences click-zone-05" href="#/preferences" ${component.viewName === 'preferences' ? 'active' : ''}>
		<gwbw-icon name="settings"></gwbw-icon>
		<span>Preferences</span>
	</a>
	`;
};

export const makeTemplate = (component: Header) => {
	return makeCss(component) + makeHtml(component);
};
