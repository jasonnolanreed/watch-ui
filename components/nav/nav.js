import {router} from '../../router.js';
import {NamedSizeElement} from '../../classes/named-size.js';
import {Auth} from '../../api-helpers/auth.js';

import {makeTemplate} from './nav-templates.js';

export class Nav extends NamedSizeElement {
	constructor() {
		super();

		this.onClick = this.onClick.bind(this);

		this.attachShadow({mode: `open`});
		this.loggedIn = false;
		this.setNamedSizes([
			{name: `huge`, width: 1}
		]);
	}

	async connectedCallback() {
		super.connectedCallback();
		this.loggedIn = await Auth.isLoggedIn();
		this.render();
		this.addEventListener(`click`, this.onClick);
	}

	disconnectedCallback() {
		this.removeEventListener(`click`, this.onClick);
		super.disconnectedCallback();
	}

	render() {
		this.shadowRoot.innerHTML = makeTemplate(this);
	}

	async onClick(event) {
		if (!event || !event.path || !event.path.length) { return; }
		for (let target of event.path) {
			if (typeof target.matches !== `function`) { continue; }
			if (target.matches(`.logout`)) {
				event.preventDefault();
				const didLogOut = await Auth.logout();
				router.navigate(`/`);
				break;
			}
		}
	}
}

customElements.define(`gwbw-nav`, Nav);
