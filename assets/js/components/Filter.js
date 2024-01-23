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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4.98633 8.52454H19.0137C19.4054 8.52454 19.7218 8.2006 19.7218 7.80886C19.7218 7.41711 19.4054 7.10071 19.0137 7.10071H4.98633C4.58706 7.10071 4.27818 7.41711 4.27818 7.80886C4.27818 8.2006 4.59459 8.52454 4.98633 8.52454ZM6.54576 12.4193H17.4844C17.8761 12.4193 18.1925 12.0954 18.1925 11.7037C18.1925 11.3044 17.8837 10.988 17.4844 10.988H6.54576C6.14649 10.988 5.83761 11.3119 5.83761 11.7037C5.83761 12.0879 6.15402 12.4193 6.54576 12.4193ZM8.07506 16.3066H15.9551C16.3544 16.3066 16.6632 15.9827 16.6632 15.5909C16.6632 15.1992 16.3544 14.8828 15.9551 14.8828H8.07506C7.67578 14.8828 7.36691 15.1992 7.36691 15.5909C7.36691 15.9827 7.67578 16.3066 8.07506 16.3066Z" fill="#E5E7EB"/>
                </svg>
            </button>
            <button class="icon-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4.98633 8.52454H19.0137C19.4054 8.52454 19.7218 8.2006 19.7218 7.80886C19.7218 7.41711 19.4054 7.10071 19.0137 7.10071H4.98633C4.58706 7.10071 4.27818 7.41711 4.27818 7.80886C4.27818 8.2006 4.59459 8.52454 4.98633 8.52454ZM6.54576 12.4193H17.4844C17.8761 12.4193 18.1925 12.0954 18.1925 11.7037C18.1925 11.3044 17.8837 10.988 17.4844 10.988H6.54576C6.14649 10.988 5.83761 11.3119 5.83761 11.7037C5.83761 12.0879 6.15402 12.4193 6.54576 12.4193ZM8.07506 16.3066H15.9551C16.3544 16.3066 16.6632 15.9827 16.6632 15.5909C16.6632 15.1992 16.3544 14.8828 15.9551 14.8828H8.07506C7.67578 14.8828 7.36691 15.1992 7.36691 15.5909C7.36691 15.9827 7.67578 16.3066 8.07506 16.3066Z" fill="#E5E7EB"/>
                </svg>
            </button>
        `
    }
}

window.customElements.define('app-filter', FilterComponent);