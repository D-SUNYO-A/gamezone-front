import { eventBus } from "../services/EventBus.js";
import { genres, platforms, themes } from "../utils/data.js";

export class FilterModal extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.render();

    this.btnCloseModal();
    this.closeOffTarget();

    this.platformList();
    this.genreList();
    this.themeList();

    this.selectedFilters = {
      platforms: [],
      genres: [],
      themes: [],
    };

    // Charger les filtres du localStorage
    this.loadFiltersFromLocalStorage();
  }

  // Ouvrir modal
  open() {
    this.root.querySelector("#filterModal").classList.add("open");
    // Ajouter la classe CSS pour désactiver le défilement
    document.body.style.overflow = "hidden";
  }

  // Fermer modal
  close() {
    this.root.querySelector("#filterModal").classList.remove("open");
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
      const filterModal = this.root.getElementById("filterModal");
      if (event.target === filterModal) {
        this.close();
      }
    });
  }

  createTag(name) {
    const tag = document.createElement("span");
    tag.classList.add("tag");
    tag.textContent = name;
    return tag;
  }

  toggleTags(tagsList, filterType) {
    tagsList.addEventListener("click", (event) => {
      if (event.target.classList.contains("tag")) {
        const filterValue = event.target.textContent;
        event.target.classList.toggle("selected");

        this.toggleFilterSelection(filterType, filterValue);
        this.saveFiltersToLocalStorage();
      }
    });
  }

  toggleFilterSelection(filterType, filterValue) {
    const index = this.selectedFilters[filterType].indexOf(filterValue);
    if (index !== -1) {
      this.selectedFilters[filterType].splice(index, 1);
    } else {
      this.selectedFilters[filterType].push(filterValue);
    }
  }


  platformList() {
    const platformsList = this.root.getElementById("platforms");
    platforms.forEach((platform) => {
      platformsList.appendChild(this.createTag(platform.name));
    });

    this.toggleTags(platformsList, "platforms");
  }

  genreList() {
    const genresList = this.root.getElementById("genres");
    genres.forEach((genre) => {
      genresList.appendChild(this.createTag(genre.name));
    });

    this.toggleTags(genresList, "genres");
  }

  themeList() {
    const themesList = this.root.getElementById("themes");
    themes.forEach((theme) => {
      themesList.appendChild(this.createTag(theme.name));
    });

    this.toggleTags(themesList, "themes");
  }

  applyFilter() {
    const selectedFilters = {
        platforms: Array.from(this.root.querySelectorAll('#platforms .selected')).map(selected => selected.textContent),
        genres: Array.from(this.root.querySelectorAll('#genres .selected')).map(selected => selected.textContent),
        themes: Array.from(this.root.querySelectorAll('#themes .selected')).map(selected => selected.textContent),
    };

    // Déclencher un événement personnalisé pour notifier le changement de filtre
    eventBus.fire('filtersChanged', selectedFilters);

    // console.log(selectedFilters);

    // Fermer le modal après avoir appliqué les filtres
    this.close();
  }

  saveFiltersToLocalStorage() {
    localStorage.setItem("selectedFilters", JSON.stringify(this.selectedFilters));
  }

  loadFiltersFromLocalStorage() {
    const savedFilters = localStorage.getItem("selectedFilters");
    if (savedFilters) {
      this.selectedFilters = JSON.parse(savedFilters);

      // Appliquer les filtres chargés aux éléments visuels (tags)
      this.applyLoadedFilters();
    }
  }

  applyLoadedFilters() {
    // Appliquer les filtres chargés aux éléments visuels (tags)
    this.applyLoadedFilterToTags("platforms");
    this.applyLoadedFilterToTags("genres");
    this.applyLoadedFilterToTags("themes");
  }

  applyLoadedFilterToTags(filterType) {
    const tagsList = this.root.getElementById(filterType);
    const selectedFilterValues = this.selectedFilters[filterType];

    Array.from(tagsList.children).forEach((tag) => {
      const tagValue = tag.textContent;
      const isSelected = selectedFilterValues.includes(tagValue);

      if (isSelected) {
        tag.classList.add("selected");
      } else {
        tag.classList.remove("selected");
      }
    });
  }

  render() {
    this.root.innerHTML = `
        <link rel="stylesheet" href="./assets/css/index.css" />
        <link rel="stylesheet" href="./assets/css/filterModal.css" />

        <div id="filterModal" class="modal">
          <div id="modalContent" class="modal-content">
              <div class="modal-content-head">
                  <div class="title">
                      <p>Filter options</p>
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
              <div class="modal-content-body">
                <div class="topic">
                  <h5 class="title">Platforms</h5>
                  <div id="platforms" class="tags"></div>
                </div>
                <div class="topic">
                  <h5 class="title">Genres</h5>
                  <div id="genres" class="tags"></div>
                </div>
                <div class="topic">
                  <h5 class="title">Themes</h5>
                  <div id="themes" class="tags"></div>
                </div>
              </div>
              <div class="modal-content-footer">
                <button>Apply Filter</button>
              </div>
          </div>
        </div>
    `;

    const applyFilterButton = this.root.querySelector('.modal-content-footer button');
    applyFilterButton.addEventListener('click', () => {
      this.applyFilter();
    });
  }
}

customElements.define("app-modal", FilterModal);
