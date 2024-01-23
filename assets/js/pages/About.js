export default class AboutComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.render();
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css">
            <link rel="stylesheet" href="./assets/css/about.css">

            <div id="about" class="page">
                <app-navbar></app-navbar>
                <h1>About us ?</h1>
            </div>
        `
    }
}   

window.customElements.define('app-about', AboutComponent);