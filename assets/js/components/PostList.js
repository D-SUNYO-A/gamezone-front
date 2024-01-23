import { eventBus } from "../services/EventBus.js";
import { postService } from "../services/PostService.js";
import PostCardComponent from "./PostCard.js";

export default class PostListComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.render();
        this.postList();
        eventBus.register('postSaved', () => {
            this.render();
            this.postList();
        });
    }

    async postList() {
        const posts = await postService.getPostData();
        posts.reverse().forEach(post => {
            const postList = this.root.getElementById("post-list");
            const postCard = document.createElement('app-postcard');
            postCard.data = post;
            postList.appendChild(postCard);
        })
        
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css">
            <link rel="stylesheet" href="./assets/css/postList.css">
            
            <div id="post-list" class="post-list">
                <h3>All posts</h3>
                <!-- Post List Here -->
            </div>
        `
    }
}   

window.customElements.define('app-postlist', PostListComponent);