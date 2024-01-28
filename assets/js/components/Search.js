import { eventBus } from "../services/EventBus.js";
import { gameService } from "../services/GameService.js";

export class SearchComponent extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
    this.render();
    this.searchTimeout = null;
  }

  connectedCallback() {
    const input = this.root.querySelector("input");
    const clearButton = this.root.getElementById("clear");
    input.addEventListener("input", (event) => this.handleSearch(event));

    // Ajouter un gestionnaire d'événements au clic sur le bouton clear
    clearButton.addEventListener("click", async () => {
      this.clearInput();

      const inputGroup = this.root.querySelector('.input-group');

      inputGroup.classList.add('loading');
      const allGames = await gameService.getGameData();
      eventBus.fire('searchFieldEmpty', allGames);
      inputGroup.classList.remove('loading');
    });
  }  
  
  // Effacer le contenu de l'input
  clearInput() {
    const input = this.root.querySelector("input");
    input.value = ""; 

    // Cacher le bouton clear lorsque l'input est vidé
    const clearButton = this.root.getElementById("clear");
    clearButton.style.display = "none";
  }

  async handleSearch(event) {
    clearTimeout(this.searchTimeout);

    const searchTerm = event.target.value;

    const inputGroup = this.root.querySelector('.input-group');
    const clearButton = this.root.getElementById("clear");

    // Afficher le bouton clear uniquement lorsque le champ n'est pas vide
    clearButton.style.display = searchTerm.length > 0 ? "block" : "none";
    
    // Déclencher la recherche après un délai de 2 secondes
    this.searchTimeout = setTimeout(async () => {
      if (searchTerm.length >= 2) {
        inputGroup.classList.add('loading');
        const searchResults = await gameService.searchGameData(searchTerm);
        inputGroup.classList.remove('loading');
        eventBus.fire('searchResultsReady', searchResults);
      } else if (searchTerm.length === 0) {
        // Si le champ de recherche est vide, récupérez la liste complète des jeux
        inputGroup.classList.add('loading');
        const allGames = await gameService.getGameData();
        eventBus.fire('searchFieldEmpty', allGames);
        inputGroup.classList.remove('loading');
      }
    }, 2000);
  }


  render() {
    this.root.innerHTML = `
        <link rel="stylesheet" href="./assets/css/index.css" />
        <link rel="stylesheet" href="./assets/css/search.css" />

        <div class="input-group">
            <img src="./assets/img/magnifyingglass.svg" alt="search">
            <input type="text" placeholder="Search..." />
            <img id="clear" src="./assets/img/xmark.svg" alt="filter">
        </div>
    `;
  }
}

window.customElements.define("app-search", SearchComponent);
