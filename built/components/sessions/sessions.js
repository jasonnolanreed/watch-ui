import { GA } from '../../ga.js';
import { router } from '../../router.js';
import { GWBWElement } from '../../classes/gwbw-element.js';
import { WatchApi } from '../../api-helpers/watch.js';
import { MeasureApi } from '../../api-helpers/measure.js';
import { PreferenceApi } from '../../api-helpers/preference.js';
import { CustomPositionsApi } from '../../api-helpers/custom-positions.js';
import { parseSessionsFromMeasures } from '../../utilities/measure.js';
import { makeTemplate } from './sessions-templates.js';
export class Sessions extends GWBWElement {
    stickyObserver;
    currentSessionIndex;
    intervalStartIndex;
    currentSession;
    currentSessionSorted;
    watch;
    measures;
    preferences;
    customPositions;
    sessions;
    constructor() {
        super();
        this.attachShadow({ mode: `open` });
        this.setClickEvents([
            { target: `.previous-session`, handler: this.viewPreviousSession },
            { target: `.next-session`, handler: this.viewNextSession },
            { target: `.delete-measure`, handler: this.removeMeasure },
            { target: `.interval`, handler: this.selectInterval },
            { target: `.toggle-buttons button:not(.selected)`, handler: this.onChangeSort },
        ]);
    }
    connectedCallback() {
        super.connectedCallback();
        this.getData();
    }
    disconnectedCallback() {
        if (this.stickyObserver) {
            this.stickyObserver.disconnect();
        }
        super.disconnectedCallback();
    }
    render() {
        super.render();
        try {
            this.sortSessionMeasures();
            this.shadowRoot.innerHTML = makeTemplate(this);
            this.detectSticky();
        }
        catch (error) {
            console.error(`Error rendering`, error);
        }
    }
    viewPreviousSession(event, target) {
        router.navigate(`/sessions/${router[`params`]['watchId']}/?sessionIndex=${this.currentSessionIndex - 1}`);
    }
    viewNextSession(event, target) {
        router.navigate(`/sessions/${router[`params`]['watchId']}/?sessionIndex=${this.currentSessionIndex + 1}`);
    }
    selectInterval(event, target) {
        const index = target.getAttribute(`measure-index`);
        if (!this.intervalStartIndex) {
            this.intervalStartIndex = index;
            this.shadowRoot.querySelector(`.measures-list`).classList.add(`interval-start`);
            target.classList.add(`interval-start`);
        }
        else {
            if (this.intervalStartIndex !== index) {
                const measureOne = this.currentSessionSorted[this.intervalStartIndex]._id;
                const measureTwo = this.currentSessionSorted[index]._id;
                router.navigate(`/measure/interval/${measureOne}/${measureTwo}`);
            }
            else {
                this.intervalStartIndex = null;
                this.shadowRoot.querySelector(`.measures-list`).classList.remove(`interval-start`);
                target.classList.remove(`interval-start`);
            }
        }
    }
    async removeMeasure(event, target) {
        const measureId = target.getAttribute(`measure-id`);
        const confirmDelete = window.confirm(`Do you really want to delete this measure?`);
        if (!confirmDelete) {
            return;
        }
        this.startWorking();
        const didRemove = await MeasureApi.removeMeasure({ measureId });
        this.stopWorking();
        if (!didRemove) {
            GA.event(`measure`, `measure delete fail`);
            const messages = document.querySelector(`gwbw-messages`);
            if (messages) {
                messages.add({ message: `Failed to remove measure. Try again?`, type: `error` });
            }
        }
        else {
            GA.event(`measure`, `measure delete success`);
            this.getData();
        }
    }
    async getData() {
        const responses = await Promise.all([
            WatchApi.getWatch(router[`params`][`watchId`]),
            MeasureApi.getMeasures(router[`params`][`watchId`]),
            PreferenceApi.getPreferences(),
            CustomPositionsApi.getCustomPositions(),
        ]);
        this.watch = responses[0];
        this.measures = responses[1];
        this.preferences = responses[2];
        this.customPositions = responses[3];
        this.sessions = parseSessionsFromMeasures(this.measures);
        this.currentSessionIndex = this.sessions.length - 1;
        if (router[`query`] && router[`query`].sessionIndex &&
            router[`query`].sessionIndex > -1 &&
            router[`query`].sessionIndex < this.sessions.length) {
            this.currentSessionIndex = +router[`query`].sessionIndex;
        }
        this.currentSession = this.sessions[this.currentSessionIndex];
        this.render();
    }
    onChangeSort(event, target) {
        const newSortValue = target.classList.contains('Asc') ? 'targetAsc' : 'targetDesc';
        this.preferences.measuresSort = newSortValue;
        this.render();
        PreferenceApi.updatePreferences({ measuresSort: newSortValue });
    }
    sortSessionMeasures() {
        if (!this.currentSession || !this.currentSession.length) {
            return;
        }
        this.currentSessionSorted = [...this.currentSession];
        if (this.preferences.measuresSort.includes(`Desc`)) {
            this.currentSessionSorted = this.currentSessionSorted.reverse();
        }
    }
    detectSticky() {
        if (this.stickyObserver) {
            this.stickyObserver.disconnect();
        }
        this.stickyObserver = new IntersectionObserver(([e]) => e.target.toggleAttribute('stuck', e.intersectionRatio < 1), { threshold: [0] });
        this.stickyObserver.observe(this.shadowRoot.querySelector(`.sticky-controls-outer`));
    }
}
customElements.define(`gwbw-sessions`, Sessions);
