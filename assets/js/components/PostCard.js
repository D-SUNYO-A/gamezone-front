import { formatDate } from "../utils/formatDate.js";
import { baseUrl } from "../utils/urls.js";
import PostActions from "./PostActions.js";

export default class PostCardComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
    }

    postMedia(post) {
        if (post.videos && post.videos.length > 0) {
            const footer = this.root.getElementById("card-footer");
  
            post.videos.forEach((videoPath) => {
              const videoElement = document.createElement("video");
              const videoUrl = `${baseUrl}/${videoPath.replace(/\\/g, '/')}`;
              videoElement.src = videoUrl;
              videoElement.controls = true;
              footer.appendChild(videoElement);
            });
        } else if (post.images && post.images.length > 0) {
            const footer = this.root.getElementById("card-footer");

            post.images.forEach((imagePath) => {
                const imageElement = document.createElement("img");
                const imageUrl = `${baseUrl}/${imagePath.replace(/\\/g, '/')}`;
                imageElement.src = imageUrl;
                footer.appendChild(imageElement);
            });
        }
    }

    openPostActions(post) {
        const actions = this.root.getElementById("actions");
        actions.addEventListener('click', () => {
            const postActions = document.createElement('app-postactions');
            document.body.appendChild(postActions);
            postActions.data = post;
            postActions.open();
        })
    }

    set data(post) {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css">
            <link rel="stylesheet" href="./assets/css/postCard.css">
            
            <div class="card">
                <div class="card-header">
                    <div class="user">
                        <img src="./assets/img/profil.jpg" alt="profil">
                        <div class="user-details">
                            <p>Anonymous user</p>
                            <div class="time">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M7.99496 12.9955C10.8426 12.9955 13.1931 10.6451 13.1931 7.80246C13.1931 4.95982 10.8376 2.60938 7.98994 2.60938C5.1473 2.60938 2.80188 4.95982 2.80188 7.80246C2.80188 10.6451 5.15233 12.9955 7.99496 12.9955ZM5.46371 8.43527C5.23771 8.43527 5.06192 8.25949 5.06192 8.03348C5.06192 7.80748 5.23771 7.6317 5.46371 7.6317H7.59317V4.74888C7.59317 4.52288 7.76896 4.3471 7.98994 4.3471C8.22096 4.3471 8.39675 4.52288 8.39675 4.74888V8.03348C8.39675 8.25949 8.22096 8.43527 7.98994 8.43527H5.46371Z" fill="#E5E7EB"/>
                                </svg>
                                <span>${formatDate(post.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    <svg id="actions" class="actions" xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none">
                    <path d="M20.7749 19.9916V20.0083M20.7749 13.325V13.3416M20.7749 26.6583V26.675" stroke="#E5E7EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="card-body">
                    <h5>${post.title}</h5>
                    <p>${post.description}</p>
                </div>
                <div id="card-footer" class="card-footer"></div>
            </div>
        `

        this.postMedia(post);
        this.openPostActions(post);
    }
}   

window.customElements.define('app-postcard', PostCardComponent);