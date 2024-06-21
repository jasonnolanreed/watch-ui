import '../message/message.js';
export const makeCss = (component) => (String.raw `
<style>
:host {
	position: fixed;
	top: calc(0.5 * var(--layout-padding-large));
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	max-width: calc(var(--layout-max-width) - (2 * var(--layout-padding-large)));
	z-index: 10;
}

/* DEV NOTE: These media queries should stay in sync with layouts.css */
@media (max-width: 900px) {
	:host {
		top: calc(0.5 * var(--layout-padding-small));
		max-width: calc(100% - (2 * var(--layout-padding-xsmall)));
	}
}
</style>
`);
export const getMessageElement = (options) => {
    let message = document.createElement(`gwbw-message`);
    message.setAttribute(`type`, options.type || `info`);
    message.setAttribute(`message`, options.message || `[missing message]`);
    message.setAttribute(`dismissable`, typeof options.dismissable === `boolean` ? `` + options.dismissable : `true`);
    message.setAttribute(`message-id`, options.messageId || ``);
    if (typeof options.ttl === `number`) {
        message.setAttribute(`ttl`, String(options.ttl));
    }
    if (options.persistent === true) {
        message.setAttribute(`persistent`, `true`);
    }
    return message;
};
