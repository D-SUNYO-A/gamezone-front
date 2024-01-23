import { eventBus } from "../services/EventBus.js";
import { genres, platforms, themes } from "../utils/data.js";
import GamplayComponent from "./Gameplay.js";

export default class GameModal extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.closeOffTarget();
  }

  // Ouvrir modal
  open() {
    this.root.querySelector("#gameModal").classList.add("open");
    // Ajouter la classe CSS pour désactiver le défilement
    document.body.style.overflow = "hidden";
  }

  // Fermer modal
  close() {
    this.root.querySelector("#gameModal").classList.remove("open");
    // Supprimer la classe CSS pour réactiver le défilement
    document.body.style.overflow = "auto";
    // Appeler la méthode de suppression pour supprimer le modal du DOM
    this.remove();
  }

  // Gestionnaire d'événements pour le bouton de fermeture
  btnCloseModal() {
    const closeButton = this.root.querySelector("#closeButton");
    closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  // Fermer le modal lorsque l'utilisateur clique en dehors de celui-ci
  closeOffTarget() {
    this.root.addEventListener("click", (event) => {
      const gameModal = this.root.getElementById("gameModal");
      if (event.target === gameModal) {
        this.close();
      }
    });
  }

  setGenre(game) {
    game.genres.forEach(genre => {
      const genres = this.root.getElementById("genres");
      const span = document.createElement('span');
      span.innerText = genre.name;
      genres.appendChild(span)
    })

  }

  getGameplay(game) {
    if(game.videos && game.videos.length !== 0) {
      game.videos.reverse().forEach(video => {
        const contentBody = this.root.getElementById("modal-content-body");
        const gameplay = document.createElement('app-gameplay');
        gameplay.data = video;
        contentBody.appendChild(gameplay);
      });
    } else {
      return;
    }
  }

  set data(game) {
    const cover = game.cover.url ? game.cover.url.replace("t_thumb", "t_cover_big") : game.cover

    this.root.innerHTML = `
        <link rel="stylesheet" href="./assets/css/index.css" />
        <link rel="stylesheet" href="./assets/css/gameModal.css" />

        <div id="gameModal" class="modal">
            <div id="modalContent" class="modal-content">
                <div class="modal-content-head">
                    <div class="title">
                        <p>${game.name}</p>
                    </div>
                    <div class="close" id="closeButton">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        >
                        <path
                            d="M5.13455 13.6077C4.87087 13.8714 4.85832 14.3423 5.14082 14.6185C5.41705 14.8947 5.88789 14.8884 6.15157 14.6248L9.99364 10.7764L13.842 14.6248C14.1119 14.8947 14.5765 14.8947 14.8527 14.6185C15.1227 14.336 15.129 13.8777 14.8527 13.6077L11.0107 9.75939L14.8527 5.91731C15.129 5.64736 15.129 5.1828 14.8527 4.90657C14.5702 4.63662 14.1119 4.63034 13.842 4.90029L9.99364 8.74865L6.15157 4.90029C5.88789 4.63662 5.41077 4.62407 5.14082 4.90657C4.8646 5.1828 4.87087 5.65364 5.13455 5.91731L8.9829 9.75939L5.13455 13.6077Z"
                            fill="#f3f4f6"
                            fill-opacity="0.6"
                        />
                        </svg>
                    </div>
                </div>
                <div id="modal-content-body" class="modal-content-body">
                    <img class="banner" src="${game.screenshots[0].url.replace("t_thumb", "t_screenshot_big")}" alt="profil">

                    <div class="detais">
                        <img class="cover" src="${cover}" alt="cover">
                        <div class="detais-header">
                            <div class="main-details">
                                <h1>${game.name}</h1>
                                <div class="platformes">
                                    <img src="./assets/img/pc.png" alt="logo">
                                    <img src="./assets/img/playstation.png" alt="logo">
                                    <img src="./assets/img/mac.png" alt="logo">
                                    <img src="./assets/img/android.png" alt="logo">
                                    <img src="./assets/img/linux.png" alt="logo">
                                    <img src="./assets/img/nintendo.png" alt="logo">
                                    <img src="./assets/img/xbox.png" alt="logo">
                                </div>
                                <div id="genres" class="genres"></div>
                            </div>
                            <p>${game.summary}</p>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    `;

    this.btnCloseModal();
    this.getGameplay(game);
    this.setGenre(game);
  }
}

customElements.define("app-game", GameModal);
