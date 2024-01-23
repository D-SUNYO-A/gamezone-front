import { eventBus } from "../services/EventBus.js";
import { postsUrl } from "../utils/urls.js";

export class PostCreateForm extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.render();

    this.btnCloseModal();
    this.closeOffTarget();
  }

  // Ouvrir modal
  open() {
    this.root.querySelector("#createFormModal").classList.add("open");
    // Ajouter la classe CSS pour désactiver le défilement
    document.body.style.overflow = "hidden";
  }

  // Fermer modal
  close() {
    this.root.querySelector("#createFormModal").classList.remove("open");
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
      const createFormModal = this.root.getElementById("createFormModal");
      if (event.target === createFormModal) {
        this.close();
      }
    });
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.elements.title.value;
    const description = form.elements.description.value;

    // Créez un objet FormData pour envoyer les données, y compris les fichiers
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    // Ajoutez chaque fichier image au FormData
    for (let i = 0; i < form.elements.images.files.length; i++) {
      formData.append("images", form.elements.images.files[i]);
    }

    // Ajoutez chaque fichier vidéo au FormData
    for (let i = 0; i < form.elements.videos.files.length; i++) {
      formData.append("videos", form.elements.videos.files[i]);
    }

    // Utilisez fetch pour envoyer le FormData au serveur
    const response = await fetch(`${postsUrl}`, {
      method: "POST",
      body: formData,
    });

    eventBus.fire("waiting", this);

    if (response.ok) {
      form.reset();
      eventBus.fire("postSaved", this);
      this.close();
    } else {
      console.log('non');
    }
  }

  render() {
    this.root.innerHTML = `
        <link rel="stylesheet" href="./assets/css/index.css" />
        <link rel="stylesheet" href="./assets/css/modal.css" />
        <link rel="stylesheet" href="./assets/css/postCreateForm.css" />

        <div id="createFormModal" class="modal">
          <div id="modalContent" class="modal-content">
              <div class="modal-content-head">
                  <div class="title">
                      <p>New post</p>
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
                <form id="postForm" enctype="multipart/form-data">
      
                  <div class="form-group">
                    <label for="title">Title</label>
                    <input class="form-control" type="text" id="title" name="title" placeholder="Title of the post" required />
                  </div>
                  
                  <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" name="description" required>Description of the post</textarea>
                  </div>
              
                  <div class="media">
                    <div class="file-form-group">
                      <label for="images">Images</label>
                      <input type="file" id="images" name="images" accept="image/*" multiple />
                    </div>
                
                    <div class="file-form-group">
                      <label for="videos">Videos</label>
                      <input type="file" id="videos" name="videos" accept="video/*" multiple />
                    </div>
                  </div>
              
                  <button type="submit">Save Post</button>

                </form>
              </div>
          </div>
        </div>
    `;

    // Attach event listener to form
    const postForm = this.root.getElementById("postForm");
    postForm.addEventListener("submit", this.handleFormSubmit.bind(this));
  }
}

customElements.define("app-postcreateform", PostCreateForm);
