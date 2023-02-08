import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {WatchApi} from '../../api-helpers/watch.js';
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './timegrapher-add-templates.js';

export class TimegrapherAdd extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
	}

	connectedCallback() {
		super.connectedCallback();
		this.bindShadowForm();
		this.getData();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	getData() {
		Promise.all([
			WatchApi.getWatch(router.params[`watchId`]),
		])
		.then(responses => {
			this.watch = responses[0];
			this.render();
		})
		.catch(error => null);
	}

	render() {
		super.render();
		try {
			this.shadowRoot.innerHTML = makeTemplate(this);
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	async onSubmit(event, target) {
		this.startWorking();
		alert("save");
		// const addSuccessful = await WatchApi.add(getFormData(target));
		this.stopWorking();
		// if (addSuccessful) {
		// 	GA.event(`watch`, `watch add success`);
		// 	router.navigate(`/watches`);
		// } else {
		// 	GA.event(`watch`, `watch add fail`);
		// 	const messages = document.querySelector(`gwbw-messages`);
		// 	if (messages) {
		// 		messages.add({message: `Failed to add watch. Try again?`, type: `error`});
		// 	}
		// }
	}
}

customElements.define(`gwbw-timegrapher-add`, TimegrapherAdd);
