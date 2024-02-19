const makeCss = (component) => (`
<style>
@import "styles/global-styles.css";

:host {
	max-width: 750px;
	margin: 0.5em auto;
	padding: 1em;
	color: #fff;
	background-color: var(--light-blue);
	border-radius: 2px;
	box-shadow: 0 2px 6px 0px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 4em rgba(0, 0, 0, 0.15);
}

:host { background-color: var(--light-blue); }
:host([type=info]) { background-color: var(--blue); }
:host([type=success]) { background-color: var(--green); }
:host([type=error]) { background-color: var(--red); }

.message {
	display: flex;
	align-items: center;
}

.type, .close {
	transform: scale(1.5);
	margin-right: 0.6em;
	text-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}

.close {
	padding: .55em;
	margin: -.55em;
	margin-left: auto;
	font-size: 0.9em;
	color: #fff;
}

.text { margin-right: 1em; }
</style>
`);
const makeHtml = (component) => (`
<div class="message">
	${getTypeIcon(component)}${` `}
	<span class="text">${component.getAttribute(`message`)}</span>
	${getCloseIcon(component)}
</div>
`);
const getTypeIcon = component => {
    let iconName = ``;
    if (component.getAttribute(`type`) === `info`) {
        iconName = `info`;
    }
    if (component.getAttribute(`type`) === `success`) {
        iconName = `check_circle`;
    }
    if (component.getAttribute(`type`) === `error`) {
        iconName = `warning`;
    }
    return `<gwbw-icon class="type" name="${iconName}"></gwbw-icon>`;
};
const getCloseIcon = component => {
    if (component.getAttribute(`dismissable`) !== `true`) {
        return ``;
    }
    else {
        return `
			<button class="close sneaky-button">
				<gwbw-icon name="cancel"></gwbw-icon>
			</button>
		`;
    }
};
export const makeTemplate = (component) => {
    return makeCss(component) + makeHtml(component);
};
