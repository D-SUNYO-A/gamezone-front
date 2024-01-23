import GameModal from "./GameModal.js";

export class GameCardComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
    }

    imageLoader() {
        const img = this.root.querySelector("img");
        if(img.complete) {
            this.loaded();
        } else {
            img.addEventListener("load", () => this.loaded());
        }
    }

    loaded() {
        this.root.querySelector(".card-header").classList.add("loaded");
    }

    showDetails(game) {
        this.root.addEventListener('click', () => {
            const gameModal = document.createElement('app-game');
            document.body.appendChild(gameModal);
            gameModal.data = game;
            gameModal.open();
        })
    }

    set data(game) {
        const cover = game.cover.url ? game.cover.url.replace("t_thumb", "t_cover_big") : game.cover

        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css" />
            <link rel="stylesheet" href="./assets/css/gameCard.css" />
            
            <div class="card">
                <div class="card-header">
                    <img src="${cover}" alt="cover-game" loading="lazy">
                </div>
                <div class="card-body">
                    <h5 class="game-name">${game.name}</h5>
                </div>
            </div>
        `
        this.imageLoader();
        this.showDetails(game);
    }
}

window.customElements.define('app-card', GameCardComponent);