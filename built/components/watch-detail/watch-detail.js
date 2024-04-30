import { router } from '../../router.js';
import { GWBWElement } from '../../classes/gwbw-element.js';
import { WatchApi } from '../../api-helpers/watch.js';
import { MeasureApi } from '../../api-helpers/measure.js';
import { TimegrapherApi } from '../../api-helpers/timegrapher.js';
import { parseSessionsFromMeasures } from '../../utilities/measure.js';
import { makeTemplate } from './watch-detail-templates.js';
export class WatchDetail extends GWBWElement {
    watch;
    measures;
    timegrapherResults;
    sessions;
    latestSession;
    latestTimegrapherResults;
    constructor() {
        super();
        this.attachShadow({ mode: `open` });
    }
    connectedCallback() {
        super.connectedCallback();
        this.getData();
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
    async getData() {
        const responses = await Promise.all([
            WatchApi.getWatch(router[`params`][`watchId`]),
            MeasureApi.getMeasures(router[`params`][`watchId`]),
            TimegrapherApi.getTimegrapherResults(router[`params`][`watchId`])
        ]);
        this.watch = responses[0];
        this.measures = responses[1];
        this.timegrapherResults = responses[2];
        this.sessions = parseSessionsFromMeasures(this.measures);
        this.latestSession = this.sessions[this.sessions.length - 1];
        this.latestTimegrapherResults = this.timegrapherResults[this.timegrapherResults.length - 1];
        this.render();
    }
}
customElements.define(`gwbw-watch-detail`, WatchDetail);
