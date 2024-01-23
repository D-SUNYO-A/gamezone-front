export default class GamplayComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
    }

    set data(video) {
        const gameplay = `https://www.youtube.com/embed/${video.video_id}`;

        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css">
            <link rel="stylesheet" href="./assets/css/gameplay.css">
            
            <div class="gameplay">
                <h3>${video.name}</h3>
                <iframe src="${gameplay}" frameborder="0" allowfullscreen></iframe>
            </div>
        `
    }
}   

window.customElements.define('app-gameplay', GamplayComponent);