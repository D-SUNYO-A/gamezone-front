import PostListComponent from "../components/PostList.js";
import PostAsideComponent from "../components/PostAside.js";
 
import { PostCreateForm } from "../components/PostCreateForm.js"; 

export default class ForumComponent extends HTMLElement {
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
            <link rel="stylesheet" href="./assets/css/forum.css">
            
            <div id="forum" class="page">
                <app-navbar></app-navbar>
                <div class="blog">
                    <app-postlist></app-postlist>
                    <app-postaside></app-postaside>
                </div>
            </div>
            <div id="new">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6.54575 12.5625H11.1412V17.1579C11.1412 17.625 11.5254 18.0167 12 18.0167C12.4746 18.0167 12.8588 17.625 12.8588 17.1579V12.5625H17.4542C17.9213 12.5625 18.3131 12.1783 18.3131 11.7037C18.3131 11.2291 17.9213 10.8449 17.4542 10.8449H12.8588V6.24944C12.8588 5.78237 12.4746 5.39062 12 5.39062C11.5254 5.39062 11.1412 5.78237 11.1412 6.24944V10.8449H6.54575C6.07868 10.8449 5.68694 11.2291 5.68694 11.7037C5.68694 12.1783 6.07868 12.5625 6.54575 12.5625Z" fill="#F4F6F9"/>
                </svg>
            </div>
            
            <app-loader></app-loader>
        `
    }
}   

window.customElements.define('app-forum', ForumComponent);