import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {NamedSizeElement} from '../../classes/named-size.js';
import {Watch} from '../../api-helpers/watch.js';

import {makeTemplate} from './watches-templates.js';

export class Watches extends NamedSizeElement {
	constructor() {
		super();

		this.render = this.render.bind(this);
		this.onClick = this.onClick.bind(this);

		this.attachShadow({mode: `open`});
		this.setNamedSizes([
			{name: `huge`, width: 1}
		]);
	}

	connectedCallback() {
		super.connectedCallback();
		this.getWatches();
		this.addEventListener(`click`, this.onClick);
	}

	disconnectedCallback() {
		this.removeEventListener(`click`, this.onClick);
		super.disconnectedCallback();
	}

	render() {
		this.shadowRoot.innerHTML = makeTemplate(this);
	}

	async getWatches() {
		this.watches = await Watch.getWatches();
		this.render();
	}

	onClick(event) {
		if (!event || !event.path || !event.path.length) { return; }
		for (let target of event.path) {
			if (typeof target.matches !== `function`) { continue; }
			if (target.matches(`.view-watch`) || target.matches(`.list-item`)) {
				event.preventDefault();
				this.onView(target.getAttribute(`watch-id`));
				break;
			}
			if (target.matches(`.delete-watch`)) {
				event.preventDefault();
				this.onDelete(target.getAttribute(`watch-id`));
				break;
			}
		}
	}

	onView(watchId) {
		router.navigate(`/watches/detail/${watchId}`);
	}

	async onDelete(watchId) {
		const confirmDelete = confirm(`Do you really want to delete this watch and all its data?`);
		if (!confirmDelete) { return; }
		const deleteSuccessful = await Watch.delete({watchId});
		if (deleteSuccessful) {
			GA.event(`watch`, `delete success`);
			this.getWatches();
		} else {
			GA.event(`watch`, `delete fail`);
			alert(`Failed to delete watch. Try again?`);
		}
	}
}

customElements.define(`gwbw-watches`, Watches);
