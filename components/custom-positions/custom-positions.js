import {GWBWElement} from '../../classes/gwbw-element.js';
import {CustomPositionsApi} from '../../api-helpers/custom-positions.js';
import {positionsMap} from '../../utilities/position.js';

import {makeTemplate} from './custom-positions-templates.js';

export class CustomPositions extends GWBWElement {
	constructor() {
		super();
		this.getData();
		this.setClickEvents([
			{target: `.add-position`, handler: this.addPosition},
			{target: `.edit-position`, handler: this.editPosition},
			{target: `.delete-position`, handler: this.deletePosition},
		]);
	}

	async connectedCallback() {
		super.connectedCallback();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	async getData() {
		this.customPositions = await CustomPositionsApi.getCustomPositions();
		this.render();
	}

	render() {
		super.render();
		try {
			this.innerHTML = makeTemplate(this);
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	async addPosition(event, target) {
		const newName = window.prompt("New Custom Position Name") || "Custom Position";

		if (this.handleDuplicateName(newName)) { return; }

		CustomPositionsApi.addPosition({name: newName}).then(response => {
			this.getData();
		});
	}

	editPosition(event, target) {
		const currentName = target.getAttribute("position-name");
		const positionId = target.getAttribute("position-id");
		const newName = window.prompt("New Custom Position Name", currentName) || "Custom Position";

		if (this.handleDuplicateName(newName)) { return; }

		CustomPositionsApi.updateCustomPosition(positionId, {name: newName}).then(response => {
			this.getData();
		});
	}

	deletePosition(event, target) {
		const didConfirm = window.confirm(`Do you really want to delete this position?`);
		if (!didConfirm) { return; }
		const positionId = target.getAttribute("position-id");
		CustomPositionsApi.deleteCustomPosition(positionId, {}).then(response => {
			this.getData();
		});
	}

	handleDuplicateName(proposedName = "") {
		if (!positionsMap[proposedName.trim().toLowerCase()]) {
			return false;
		} else {
			const messages = document.querySelector(`gwbw-messages`);
			messages.add({message: `A position with this name already exists. Try again?`, type: `error`, ttl: 5000});
			return true;
		}
	}
}

customElements.define(`gwbw-custom-positions`, CustomPositions);
