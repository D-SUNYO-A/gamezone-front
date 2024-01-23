import { eventBus } from "./services/EventBus.js";
import { routes } from "./utils/routes.js";
import NavbarComponent from "./components/Navbar.js";
import HomeComponent  from "./pages/Home.js";
import AboutComponent  from "./pages/About.js";
import GamesComponent from "./pages/Games.js";
import NotFoundComponent  from "./pages/404.js";
import ForumComponent from "./pages/Forum.js";

export default class AppComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.render();

        // Gestionnaire pour l'événement popstate
        window.addEventListener('popstate', () => {
            this.handleLocation();
        });
    }

    handleLocation() {
        let path = window.location.hash.replace("#", "");
        if (path.length == 0) {
            path = "/";
        }
        const routeRender = routes[path] || routes[404];
        const app = this.root.getElementById("app");
        app.innerHTML = "";
        app.appendChild(document.createElement(routeRender));
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css">
            
            <div id="app">
                <app-home></app-home>
            </div>
        `
    }
}

window.customElements.define('app-app', AppComponent);