import { GWBWElement } from '../../classes/gwbw-element.js';
import { makeTemplate } from './home-templates.js';
export class Home extends GWBWElement {
    constructor() {
        super();
        this.attachShadow({ mode: `open` });
    }
    connectedCallback() {
        super.connectedCallback();
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
