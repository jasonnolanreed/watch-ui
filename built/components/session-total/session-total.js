import { GWBWElement } from '../../classes/gwbw-element.js';
import { makeTemplate } from './session-total-templates.js';
export class SessionTotal extends GWBWElement {
    constructor() {
        super();
        this.attachShadow({ mode: `open` });
    }
    static get observedAttributes() { return [`session`, `goodtoleranceplus`, `goodtoleranceminus`]; }
    get session() { return this.getAttribute(`session`); }
    set session(stringifiedSession) { this.setAttribute(`session`, stringifiedSession); }
    get goodtoleranceplus() { return this.getAttribute(`goodtoleranceplus`); }
    set goodtoleranceplus(plusValue) { this.setAttribute(`goodtoleranceplus`, plusValue); }
    get goodtoleranceminus() { return this.getAttribute(`goodtoleranceminus`); }
    set goodtoleranceminus(minusValue) { this.setAttribute(`goodtoleranceminus`, minusValue); }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === `session` && newValue !== oldValue) {
            if (this.session !== "undefined") {
                this.sessionData = JSON.parse(decodeURI(this.session));
            }
            this.render();
        }
        if (name === `goodtoleranceplus` && newValue !== oldValue) {
            this.goodTolerancePlusValue = this.goodtoleranceplus;
            this.render();
        }
        if (name === `goodtoleranceminus` && newValue !== oldValue) {
            this.goodToleranceMinusValue = this.goodtoleranceminus;
            this.render();
        }
    }
    connectedCallback() {
        super.connectedCallback();
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
customElements.define(`gwbw-session-total`, SessionTotal);
