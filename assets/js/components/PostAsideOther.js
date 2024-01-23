export default class PostAsideOtherComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.render();
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css">
            <link rel="stylesheet" href="./assets/css/postAsideOther.css">
            
            
        `
    }
}   

window.customElements.define('app-other', PostAsideOtherComponent);