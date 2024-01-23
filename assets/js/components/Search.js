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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M10.7419 16.3141C11.9397 16.3141 13.0622 15.9525 13.9964 15.3348L17.296 18.642C17.5145 18.8529 17.7932 18.9584 18.0946 18.9584C18.7199 18.9584 19.1794 18.4687 19.1794 17.851C19.1794 17.5647 19.0815 17.2859 18.8705 17.075L15.5935 13.7829C16.2715 12.8186 16.6708 11.6509 16.6708 10.3853C16.6708 7.12327 14.0039 4.45642 10.7419 4.45642C7.48744 4.45642 4.81305 7.12327 4.81305 10.3853C4.81305 13.6473 7.4799 16.3141 10.7419 16.3141ZM10.7419 14.7321C8.35379 14.7321 6.39508 12.7734 6.39508 10.3853C6.39508 7.99716 8.35379 6.03845 10.7419 6.03845C13.13 6.03845 15.0887 7.99716 15.0887 10.3853C15.0887 12.7734 13.13 14.7321 10.7419 14.7321Z" fill="#E5E7EB"/>
            </svg>
            <input type="text" placeholder="Search..." />
            <svg id="clear" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6.16155 16.3293C5.84514 16.6457 5.83008 17.2107 6.16908 17.5422C6.50056 17.8736 7.06557 17.8661 7.38198 17.5497L11.9925 12.9317L16.6105 17.5497C16.9344 17.8736 17.4919 17.8736 17.8234 17.5422C18.1473 17.2032 18.1549 16.6532 17.8234 16.3293L13.2129 11.7112L17.8234 7.10075C18.1549 6.77681 18.1549 6.21933 17.8234 5.88786C17.4844 5.56392 16.9344 5.55639 16.6105 5.88033L11.9925 10.4984L7.38198 5.88033C7.06557 5.56392 6.49302 5.54885 6.16908 5.88786C5.83761 6.21933 5.84514 6.78434 6.16155 7.10075L10.7796 11.7112L6.16155 16.3293Z" fill="#E5E7EB"/>
            </svg>
        </div>
    `;
  }
}

window.customElements.define("app-search", SearchComponent);
