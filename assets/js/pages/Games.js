import { LoaderComponent } from "../components/Loader.js";
import { ActionsComponent } from "../components/Actions.js";
import { GameListComponent } from "../components/GameList.js";

export default class GamesComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.render();
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css">
            <link rel="stylesheet" href="./assets/css/games.css">
            
            <div id="games" class="page">
                <app-navbar></app-navbar>

                <div class="content">
                    <app-actions></app-actions>
                    <app-list></app-list>
                </div>
            </div>
            <app-loader></app-loader>
        `
    }
}   

window.customElements.define('app-games', GamesComponent);