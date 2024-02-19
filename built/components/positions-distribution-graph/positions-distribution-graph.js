import { GWBWElement } from '../../classes/gwbw-element.js';
import { positionsMap } from '../../utilities/position.js';
import { roundToOneDecimal } from '../../utilities/number.js';
import { makeTemplate } from './positions-distribution-graph-templates.js';
export class PositionsDistributionGraph extends GWBWElement {
    constructor() {
        super();
        super.render(); // kill default loading UI immediately
        this.setAttribute(`loading`, true);
        this.render(); // render immmediately for placeholder UI
        this.initChart = this.initChart.bind(this);
        this._hasChartJS = false;
        this.positionsData = null;
        this.graph = null;
    }
    static get observedAttributes() { return [`positions`]; }
    get positions() { return this.getAttribute(`positions`); }
    set positions(stringifiedPositions) { this.setAttribute(`positions`, stringifiedPositions); }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === `positions` && newValue !== oldValue) {
            this.positionsData = JSON.parse(decodeURI(this.positions));
            this.render();
        }
    }
    async connectedCallback() {
        super.connectedCallback();
        await this.fetchRequiredScriptsInSequence([`../../vendor/chart.js`]);
        this._hasChartJS = true;
        this.render();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    render() {
        try {
            this.innerHTML = makeTemplate(this);
            if (this.positionsData && this._hasChartJS) {
                this.initChart();
            }
        }
        catch (error) {
            console.error(`Error rendering`, error);
        }
    }
    initChart() {
        this.removeAttribute(`loading`);
        const positionsData = this.positionsData;
        const cssStyles = window.getComputedStyle(document.body);
        const blue = cssStyles.getPropertyValue(`--blue`);
        const lightBlue = cssStyles.getPropertyValue(`--light-blue`);
        const darkBlue = cssStyles.getPropertyValue(`--dark-blue`);
        const silver = cssStyles.getPropertyValue(`--silver`);
        const green = cssStyles.getPropertyValue(`--green`);
        let colorsArray = [darkBlue, blue, silver, lightBlue, green];
        colorsArray = [...colorsArray, ...colorsArray, ...colorsArray];
        let config = {
            type: `pie`,
            data: {
                labels: [],
                datasets: [{
                        data: [],
                        backgroundColor: [],
                        borderColor: `#fff`
                    }]
            },
            options: {
                animation: false,
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: `top`
                    },
                    title: {
                        display: true,
                        text: `Position Distribution by Time`
                    },
                    tooltip: {
                        callbacks: {
                            label: point => getLabel(point)
                        }
                    }
                }
            }
        };
        let positionsOrder = [];
        Object.keys(positionsData).map((positionKey, index) => {
            const position = positionsData[positionKey];
            positionsOrder.push(positionKey);
            config.data.labels.push(positionsMap[position.name].label);
            config.data.datasets[0].data.push(position.days);
            config.data.datasets[0].backgroundColor.push(colorsArray[index]);
        });
        this.graph = new Chart(this.querySelector(`canvas`), config);
        function getLabel(point) {
            const position = positionsData[positionsOrder[point.dataIndex]];
            return `${positionsMap[position.name].label}: ${roundToOneDecimal(position.days)} days`;
        }
    }
}
customElements.define(`gwbw-positions-distribution-graph`, PositionsDistributionGraph);
