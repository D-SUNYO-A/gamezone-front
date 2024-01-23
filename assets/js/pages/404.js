export default class NotFoundComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.render();
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css">
            
            <app-navbar></app-navbar>
            <h1>Error 404</h1>
        `
    }
}   

window.customElements.define('app-notfound', NotFoundComponent);