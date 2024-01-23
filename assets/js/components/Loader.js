import { eventBus } from "../services/EventBus.js";

export class LoaderComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.render();
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css" />
            <link rel="stylesheet" href="./assets/css/loader.css" />

            <div id="loader" class="loader"></div>
        `

        const loader = this.root.getElementById("loader")

        eventBus.register('waiting', () => {
            loader.classList.remove("loaded");
        })

        eventBus.register('dataReady', () => {
            loader.classList.add("loaded");
        })
    }
}

window.customElements.define('app-loader', LoaderComponent)