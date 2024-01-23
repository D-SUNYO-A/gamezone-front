import { eventBus } from "../services/EventBus.js";
import { gameService } from "../services/GameService.js";
import { GameCardComponent } from "../components/GameCard.js";

export class GameListComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        
        this.games = []; // Liste de jeux existante
        this.isLoading = false; // Pour éviter les chargements simultanés
        this.searchResults = null; // Résultats de recherche
        this.searchFieldEmpty = false; // Etat du champ de recherche
        // Stocker les filtres choisis
        this.selectedFilters = {
            platforms: [],
            genres: [],
            themes: [],
        };

        this.render();

        // Charger les filtres du localStorage
        this.loadFiltersFromLocalStorage();

        // Liste des jeux initial.
        this.initialGameList();

        // Mis en place de l'infinite scroll.
        this.setupScrollListener();

        // Répondre à l'evenement de recherche de jeux.
        this.setupSearchResultsListeners();

        // Répondre à l'evenement de champ de recherche vide.
        this.setupSearchFieldEmptyListeners();

        this.setupFilterChangeListeners();
    }

    async loadMoreGame() {
        if (this.isLoading) {
            return; // Évitez de lancer un chargement si un chargement est en cours
        }

        this.isLoading = true;

        const newGames = await gameService.getGameData();
        this.games = [...this.games, ...newGames]; // Ajoutez les nouvelles données à la liste existante

        // this.updateGameList(); // Mettez à jour l'affichage de la liste
        // Verification de "selectedFilters" dans localStorage
        const savedFilters = localStorage.getItem("selectedFilters");
        if (savedFilters) {
            this.selectedFilters = JSON.parse(savedFilters);

            // Mettre à jour la liste des jeux avec les filtres chargés
            this.updateGameList(this.selectedFilters);
        } else {
            this.updateGameList();
        }

        this.isLoading = false;
    }

    updateGameList(filters) {
        const gameList = this.root.getElementById("game-list");
        gameList.innerHTML = '';
    
        let filteredGames = this.games;
    
        // Appliquer les filtres si présents
        if (filters) {
            // Filtrer par plateformes
            if (filters.platforms && filters.platforms.length > 0) {
                filteredGames = filteredGames.filter(game =>
                    game.platforms && game.platforms.some(platform => filters.platforms.includes(platform.name))
                );
            }

            // Filtrer par genres
            if (filters.genres && filters.genres.length > 0) {
                filteredGames = filteredGames.filter(game =>
                    game.genres && game.genres.some(genre => filters.genres.includes(genre.name))
                );
            }

            // Filtrer par thèmes
            if (filters.themes && filters.themes.length > 0) {
                filteredGames = filteredGames.filter(game =>
                    game.themes && game.themes.some(theme => filters.themes.includes(theme.name))
                );
            }
        }
    
        if (this.searchResults !== null && this.searchResults.detail.length !== 0) {
            // Afficher les résultats de recherche filtrés
            this.searchResults.detail.forEach(game => {
                const gameCard = document.createElement('app-card');
                gameCard.data = game;
                gameList.appendChild(gameCard);
            });
        } else if (this.searchFieldEmpty) {
            // Afficher la liste complète des jeux (filtrée si des filtres sont présents)
            filteredGames.forEach(game => {
                const gameCard = document.createElement('app-card');
                gameCard.data = game;
                gameList.appendChild(gameCard);
            });
        } else {
            // Aucun résultat de recherche
            const noResult = document.createElement('div');
            noResult.classList.add("no-result");
            noResult.innerText = "No result 😢";
            gameList.appendChild(noResult);
        }
    }    

    async initialGameList() {
        const games = await gameService.getInitialGameData();

        console.log(games);

        this.games = games;
        this.searchFieldEmpty = true;

        // Verification de "selectedFilters" dans localStorage
        const savedFilters = localStorage.getItem("selectedFilters");
        if (savedFilters) {
            this.selectedFilters = JSON.parse(savedFilters);

            // Mettre à jour la liste des jeux avec les filtres chargés
            this.updateGameList(this.selectedFilters);
        } else {
            this.updateGameList();
        }
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            if (!this.isLoading && this.searchResults === null || this.searchFieldEmpty){
                const scrollTop = document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight;
                const clientHeight = document.documentElement.clientHeight;
        
                if (scrollTop + clientHeight === scrollHeight) {
                    this.loadMoreGame();
                }
            }
        });
    }

    setupSearchResultsListeners() {
        // Ajoutez un écouteur pour l'événement personnalisé 'searchResultsReady'
        eventBus.register('searchResultsReady', (searchResults) => {
            // Mettez à jour la liste des jeux avec les résultats de recherche
            this.searchResults = searchResults;
            this.searchFieldEmpty = false;
            this.updateGameList();
            this.root.querySelector(".more-loader").style.display = 'none';
        });
    }

    setupSearchFieldEmptyListeners() {
        // Ajoutez un écouteur pour l'événement personnalisé 'searchFieldEmpty'
        eventBus.register('searchFieldEmpty', (allGames) => {
            // Mettez à jour la liste des jeux si le champ recherche est vide
            this.searchResults = null;
            this.searchFieldEmpty = true;
            this.updateGameList();
            this.root.querySelector(".more-loader").style.display = 'flex';
        });
    }

    setupFilterChangeListeners() {
        // Gestionnaire d'événements pour l'événement personnalisé 'filtersChanged'
        eventBus.register('filtersChanged', (selectedFilters) => {
            // Mettre à jour les filtres choisis
            this.selectedFilters = selectedFilters.detail;

            // Mettre à jour la liste des jeux
            this.updateGameList(this.selectedFilters);

            console.log(this.selectedFilters);
        });
    }

    loadFiltersFromLocalStorage() {
        const savedFilters = localStorage.getItem("selectedFilters");
        if (savedFilters) {
            this.selectedFilters = JSON.parse(savedFilters);

            // Mettre à jour la liste des jeux avec les filtres chargés
            this.updateGameList(this.selectedFilters);
        }
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css" />
            <link rel="stylesheet" href="./assets/css/gameList.css" />

            <div id="game-list" class="game-list">
                <!-- Game List Here -->
            </div>

            <div class="more-loader"></div>
        `
    }
}

window.customElements.define('app-list', GameListComponent)