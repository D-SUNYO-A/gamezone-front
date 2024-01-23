import { eventBus } from "../services/EventBus.js";
import { getPostUrl } from "../utils/urls.js";
import PostEditForm from "./PostEditForm.js";

export default class PostDeleteForm extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.closeOffTarget();
  }

  // Ouvrir modal
  open() {
    this.root.querySelector("#deleteFormModal").classList.add("open");
    // Ajouter la classe CSS pour désactiver le défilement
    document.body.style.overflow = "hidden";
  }

  // Fermer modal
  close() {
    this.root.querySelector("#deleteFormModal").classList.remove("open");
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
      const deleteFormModal = this.root.getElementById("deleteFormModal");
      if (event.target === deleteFormModal) {
        this.close();
      }
    });
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const postId = form.elements.postId.value; 

    const response = await fetch(getPostUrl(postId), {
      method: "DELETE"
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

  set data(post) {
    this.root.innerHTML = `
        <link rel="stylesheet" href="./assets/css/index.css" />
        <link rel="stylesheet" href="./assets/css/modal.css" />
        <link rel="stylesheet" href="./assets/css/postDeleteForm.css" />

        <div id="deleteFormModal" class="modal">
            <div id="modalContent" class="modal-content">
                <div class="modal-content-body">
                    <svg xmlns="http://www.w3.org/2000/svg" width="97" height="96" viewBox="0 0 97 96" fill="none">
                        <g clip-path="url(#clip0_260_651)">
                            <path d="M94.7984 76.1279L58.4 9.2351C56.0384 4.8527 52.5056 2.3999 48.7136 2.3999C44.9216 2.3999 41.4416 4.9007 39.0368 9.2831L2.72959 76.1327C0.377586 80.4575 0.118386 84.8927 2.06719 88.2767C4.01119 91.6703 7.90399 93.5999 12.7184 93.5999H84.8144C89.6288 93.5999 93.5216 91.6703 95.4704 88.2815C97.4144 84.8927 97.1552 80.5103 94.7984 76.1327M48.7664 23.3135C50.6624 23.3135 52.1984 24.8783 52.1984 26.8079V58.4063C52.1984 60.3359 50.6624 61.9007 48.7664 61.9007C48.3115 61.8969 47.8618 61.8035 47.4431 61.6258C47.0243 61.4481 46.6447 61.1896 46.3259 60.865C46.0072 60.5405 45.7555 60.1563 45.5854 59.7344C45.4152 59.3125 45.33 58.8612 45.3344 58.4063V26.8031C45.3344 24.9263 46.8704 23.3135 48.7664 23.3135ZM48.7664 79.1039C45.7952 79.1039 43.4384 76.6559 43.4384 73.6319C43.4384 70.6079 45.848 68.1551 48.7664 68.1551C51.7376 68.1551 54.0944 70.6031 54.0944 73.6271C54.0944 76.6511 51.6848 79.1039 48.7664 79.1039Z" fill="#E11D48"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_260_651">
                            <rect width="96" height="96" fill="white" transform="translate(0.766602)"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <h1>Are you sure ?</h1>   
                    <h2>“${post.title}” will be totaly deleted.</h2> 
                    <div class="actions">
                        <form id="postForm" enctype="multipart/form-data">
                            <input type="hidden" id="postId" name="postId" value="${post._id}" />
                            <button id="deletebtn" type="submit">Delete the post</button>
                        </form>
                        <button class="cancel" id="closeButton">Cancel</button>
                    </div>       
                </div>
            </div>
        </div>
    `;

    this.btnCloseModal();


    // Attach event listener to form
    const postForm = this.root.getElementById("postForm");
    postForm.addEventListener("submit", this.handleFormSubmit.bind(this));
  }
}

customElements.define("app-postdeleteform", PostDeleteForm);
