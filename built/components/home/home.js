import { GWBWElement } from '../../classes/gwbw-element.js';
import { AuthApi } from '../../api-helpers/auth.js';
import { makeTemplate } from './home-templates.js';
export class Home extends GWBWElement {
    isLoggedIn = false;
    constructor() {
        super();
        this.attachShadow({ mode: `open` });
    }
    async connectedCallback() {
        super.connectedCallback();
        if (await AuthApi.isLoggedIn()) {
            this.isLoggedIn = true;
        }
        this.render();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    render() {
        super.render();
        try {
            this.shadowRoot.innerHTML = makeTemplate(this);
        }
        catch (error) {
            console.error(`Error rendering`, error);
        }
    }
}
customElements.define(`gwbw-home`, Home);
