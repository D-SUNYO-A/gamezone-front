export default class HomeComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.render();
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css">
            <link rel="stylesheet" href="./assets/css/home.css">
            
            <div id="home" class="page">
                <app-navbar></app-navbar>
                <h1>Welcome !</h1>
            </div>
        `
    }
}   

window.customElements.define('app-home', HomeComponent);