import { FilterModal } from "./FilterModal.js";

export class FilterComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' })
        this.render();
        this.openFilterModal();
    }

    openFilterModal() {
        const filters = this.root.querySelectorAll('button');

        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                const filterModal = document.createElement('app-modal');
                document.body.appendChild(filterModal);
                filterModal.open();
            });
        })
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css" />
            <link rel="stylesheet" href="./assets/css/filter.css" />

            <button>
                <span>Filter</span>
                <img src="./assets/img/filter3line.svg" alt="filter">
            </button>
            <button class="icon-btn">
                <img src="./assets/img/filter3line.svg" alt="filter">
            </button>
        `
    }
}

window.customElements.define('app-filter', FilterComponent);