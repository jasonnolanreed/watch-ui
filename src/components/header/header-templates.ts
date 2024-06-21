import {Header} from "./header";

const makeCss = (component: Header) => (
String.raw`
<style>
header {
	container-type: inline-size;
	container-name: cq-header;
}

.header-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 2rem;
	width: 100%;
	margin: 0 auto;
}

nav {
	display: flex;
	gap: 0.75rem 1rem;
}

nav a {
	display: flex;
	align-items: center;
	gap: 0.2em;
	color: var(--graphite) !important;
	text-decoration: none !important;

	&[active] {
		text-decoration: underline !important;
	}
}

nav a:hover {
	color: var(--charcoal) !important;
}

.logo-container img {
	display: none;
}

hr {
	margin: 1.5rem 0 2rem 0 !important;
}

@supports (container-type: inline-size) {
	@container cq-header (width < 650px) {
		img.small-logo {
			display: block;
			width: 40px;
			max-width: 100%;
			height: auto;
		}
	}

	@container cq-header (width >= 650px) {
		img.large-logo {
			display: block;
			width: 300px;
			max-width: 100%;
			height: auto;
		}
	}
}

@supports not (container-type: inline-size) {
	@media (max-width: 679.9px) {
		img.small-logo {
			display: block;
			width: 40px;
			max-width: 100%;
			height: auto;
		}
	}

	@media (min-width: 680px) {
		img.large-logo {
			display: block;
			width: 300px;
			max-width: 100%;
			height: auto;
		}
	}
}
</style>
`
);

const makeHtml = (component: Header) => (
String.raw`
<header>
	<div class="header-container">
		<nav>
			${getLinks(component)}
			<a class="guide click-zone-05" href="/#/guide" ${component.viewName === 'guide' ? 'active' : ''}>
				<gwbw-icon name="info"></gwbw-icon>
				<span>Guide</span>
			</a>
		</nav>
		<a class="logo-container" href="/#/">
			<img
				class="large-logo"
				src="assets/images/logo.svg?v=2.7"
				style="aspect-ratio: 300 / 45;"
				alt="Good Watch Bad Watch"
				loading="lazy"
			>
			<img
				class="small-logo"
				src="assets/images/jewel.svg?v=2.7"
				style="aspect-ratio: 1 / 1;"
				alt="Good Watch Bad Watch"
				loading="lazy"
			>
		</a>
	</div>
</header>
<hr>
`
);

const getLinks = (component: Header) => {
	if (!component.loggedIn) {
		return String.raw`
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
	return String.raw`
	<a class="watches click-zone-05" href="#/watches" ${component.viewName === 'watches' ? 'active' : ''}>
		<gwbw-icon name="watch"></gwbw-icon>
		<span>Watches</span>
	</a>
	<a class="preferences click-zone-05" href="#/preferences" ${component.viewName === 'preferences' ? 'active' : ''}>
		<gwbw-icon name="tune"></gwbw-icon>
		<span>Preferences</span>
	</a>
	`;
};

export const makeTemplate = (component: Header) => {
	return makeCss(component) + makeHtml(component);
};
