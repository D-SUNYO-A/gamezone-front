export default class PostAsidePopularComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.render();
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css">
            <link rel="stylesheet" href="./assets/css/postAsidePopular.css">
            
            <div class="card">
                <div class="card-header">
                    <h2>Popular games</h2>
                </div>
                <div class="card-body">
                    <div class="info">
                        <img src="./assets/img/gta.png" alt="game">
                        <p>GTA VI</p>
                    </div>
                    <div class="info">
                        <img src="./assets/img/genshin.png" alt="game">
                        <p>Genshin Impact</p>
                    </div>
                </div>
                <div class="card-footer">
                    <a href="#games" class="more">View more games</a>
                </div>
            </div>
        `
    }
}   

window.customElements.define('app-popular', PostAsidePopularComponent);