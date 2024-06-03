import '../message/message.js';
import {MessageOptions, Messages} from './messages.js';

export const makeCss = (component: Messages) => (
`
<style>
@import "styles/global-styles.css";

:host {
	position: fixed;
	top: 0; left: 0; right: 0;
	padding: 0 0.5em;
	z-index: 10;
}
</style>
`
);

export const getMessageElement = (options: MessageOptions) => {
	let message = document.createElement(`gwbw-message`);
	message.setAttribute(`type`, options.type || `info`);
	message.setAttribute(`message`, options.message || `[missing message]`);
	message.setAttribute(`dismissable`, typeof options.dismissable === `boolean` ? ``+options.dismissable : `true`);
	if (typeof options.ttl === `number`) {
		message.setAttribute(`ttl`, String(options.ttl));
	}
	if (options.persistent === true) {
		message.setAttribute(`persistent`, `true`);
	}
	return message;
};
