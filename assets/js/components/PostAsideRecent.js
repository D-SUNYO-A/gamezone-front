import { PostCreateForm } from "./PostCreateForm.js";

export default class PostAsideRecentComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.render();

        this.openPostCreateModal();
    }

    openPostCreateModal() {
        const create = this.root.getElementById('new');

        create.addEventListener('click', () => {
            const createModal = document.createElement('app-postcreateform');
            document.body.appendChild(createModal);
            createModal.open();
        });
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css">
            <link rel="stylesheet" href="./assets/css/postAsideRecent.css">
            
            <div class="card">
                <div class="card-header">
                    <h2>Recent posts </h2>
                </div>
                <div class="card-body">
                    <div class="details">
                        <div class="info">
                            <p>Populass du flex</p>
                            <p>Just now</p>
                        </div>
                        <div class="info">
                            <p>Ouah look</p>
                            <p>Just now</p>
                        </div>
                        <div class="info">
                            <p>WW Hypes !</p>
                            <p>Just now</p>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button id="new" class="new">New post</button>
                </div>
            </div>
        `
    }
}   

window.customElements.define('app-recent', PostAsideRecentComponent);