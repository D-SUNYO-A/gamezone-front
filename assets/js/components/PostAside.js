import PostAsideRecentComponent from "./PostAsideRecent.js"
import PostAsidePopularComponent from "./PostAsidePopular.js";

export default class PostAsideComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.render();
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css">
            <link rel="stylesheet" href="./assets/css/postAside.css">
            
            <div class="post-aside">
                <app-recent></app-recent>
                <app-popular></app-popular>
            </div>
        `
    }
}   

window.customElements.define('app-postaside', PostAsideComponent);