import { GWBWElement } from '../../classes/gwbw-element.js';
import { AuthApi } from '../../api-helpers/auth.js';
import { makeTemplate } from './guide-templates.js';
export class Guide extends GWBWElement {
    isLoggedIn = false;
    constructor() {
        super();
        this.attachShadow({ mode: `open` });
        this.setClickEvents([
            { target: `[scroll-target]`, handler: this.onClickTopic }
        ]);
        this.onClickTopic = this.onClickTopic.bind(this);
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
    onClickTopic(event, target) {
        try {
            const targetId = target.getAttribute(`scroll-target`);
            const $target = this.shadowRoot.querySelector(`[scroll-id=${targetId}]`);
            const $$allTargets = this.shadowRoot.querySelectorAll(`[scroll-id]`);
            Array.from($$allTargets).forEach($thisTarget => $thisTarget.classList.remove(`highlighted`));
            $target.scrollIntoView();
            $target.classList.add(`highlighted`);
        }
        catch (error) { }
    }
}
customElements.define(`gwbw-guide`, Guide);
