import { eventBus } from "../services/EventBus.js";
import PostEditForm from "./PostEditForm.js";
import PostDeleteForm from "./PostDeleteForm.js";

export default class PostActions extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.closeOffTarget();
  }

  // Ouvrir modal
  open() {
    this.root.querySelector("#postActions").classList.add("open");
    // Ajouter la classe CSS pour désactiver le défilement
    document.body.style.overflow = "hidden";
  }

  // Fermer modal
  close() {
    this.root.querySelector("#postActions").classList.remove("open");
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
      const postActions = this.root.getElementById("postActions");
      if (event.target === postActions) {
        this.close();
      }
    });
  }

  openPostEditForm(post) {
    const edit = this.root.getElementById("edit");
    edit.addEventListener('click', () => {
      const postEdit = document.createElement('app-posteditform');
      document.body.appendChild(postEdit);
      postEdit.data = post;
      postEdit.open();
      this.close();
    });
  }

  openPostDeleteForm(post) {
    const remove = this.root.getElementById("delete");
    remove.addEventListener('click', () => {
      const postDelete = document.createElement('app-postdeleteform');
      document.body.appendChild(postDelete);
      postDelete.data = post;
      postDelete.open();
      this.close();
    });
  }

  set data(post) {
    this.root.innerHTML = `
        <link rel="stylesheet" href="./assets/css/index.css" />
        <link rel="stylesheet" href="./assets/css/modal.css" />
        <link rel="stylesheet" href="./assets/css/postActions.css" />

        <div id="postActions" class="modal">
            <div id="modalContent" class="modal-content">
                <div class="modal-content-body">
                    <div class="actions">
                        <button id="edit" class="edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
                                <path d="M23.4941 6.61414L24.1533 5.9198C24.4873 5.56824 24.5137 5.08484 24.1797 4.75086L23.9512 4.51355C23.6523 4.21472 23.1514 4.25867 22.8262 4.58386L22.1406 5.25183L23.4941 6.61414ZM13.0879 15.9657L14.8896 15.2098L22.8525 7.24695L21.499 5.90222L13.5361 13.8739L12.7451 15.6141C12.6572 15.8163 12.8857 16.0448 13.0879 15.9657ZM9.74805 21.8632H19.9873C21.6748 21.8632 22.668 20.8788 22.668 18.9979V9.71668L20.9102 11.4657V18.8397C20.9102 19.6835 20.4619 20.1053 19.873 20.1053H9.8623C9.05371 20.1053 8.61426 19.6835 8.61426 18.8397V9.07508C8.61426 8.23133 9.05371 7.80945 9.8623 7.80945H17.3242L19.0732 6.05164H9.74805C7.84961 6.05164 6.85645 7.03601 6.85645 8.91687V18.9979C6.85645 20.8788 7.84961 21.8632 9.74805 21.8632Z" fill="#E5E7EB"/>
                            </svg>
                            Edit this post
                        </button>
                        <button id="delete" class="delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
                                <path d="M10.2324 22.7686H18.3096C19.6631 22.7686 20.5332 21.9512 20.6035 20.5977L21.1924 7.94141H22.1592C22.6074 7.94141 22.9502 7.58984 22.9502 7.15039C22.9502 6.71094 22.5986 6.37695 22.1592 6.37695H18.2568V5.05859C18.2568 3.70508 17.3955 2.91406 15.9277 2.91406H12.5879C11.1201 2.91406 10.2588 3.70508 10.2588 5.05859V6.37695H6.37402C5.93457 6.37695 5.58301 6.71973 5.58301 7.15039C5.58301 7.59863 5.93457 7.94141 6.37402 7.94141H7.34082L7.92969 20.5977C8 21.96 8.86133 22.7686 10.2324 22.7686ZM11.9023 5.1377C11.9023 4.68945 12.2188 4.39941 12.7021 4.39941H15.8135C16.2969 4.39941 16.6133 4.68945 16.6133 5.1377V6.37695H11.9023V5.1377ZM10.4082 21.1953C9.9248 21.1953 9.57324 20.835 9.54688 20.3164L8.95801 7.94141H19.5488L18.9775 20.3164C18.96 20.8438 18.6172 21.1953 18.1162 21.1953H10.4082ZM11.6738 19.7803C12.0518 19.7803 12.2891 19.543 12.2803 19.1914L12.0166 9.99805C12.0078 9.64649 11.7617 9.41797 11.4014 9.41797C11.0322 9.41797 10.7949 9.65527 10.8037 10.0068L11.0674 19.2002C11.0762 19.5518 11.3223 19.7803 11.6738 19.7803ZM14.2666 19.7803C14.6357 19.7803 14.8906 19.5518 14.8906 19.2002V10.0068C14.8906 9.65527 14.6357 9.41797 14.2666 9.41797C13.8975 9.41797 13.6514 9.65527 13.6514 10.0068V19.2002C13.6514 19.5518 13.8975 19.7803 14.2666 19.7803ZM16.8594 19.7891C17.2109 19.7891 17.457 19.5518 17.4658 19.2002L17.7295 10.0068C17.7383 9.65527 17.501 9.42676 17.1318 9.42676C16.7715 9.42676 16.5254 9.65527 16.5166 10.0068L16.2529 19.2002C16.2441 19.543 16.4814 19.7891 16.8594 19.7891Z" fill="#E5E7EB"/>
                            </svg>
                            Delete this post
                        </button>
                    </div>
                    <button class="cancel" id="closeButton">Cancel</button>
                </div>
            </div>
        </div>
    `;

    this.btnCloseModal();
    this.openPostEditForm(post);
    this.openPostDeleteForm(post);
  }
}

customElements.define("app-postactions", PostActions);
