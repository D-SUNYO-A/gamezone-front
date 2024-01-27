export default class HomeComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.render();
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css">
            <link rel="stylesheet" href="./assets/css/home.css">
            
            <div id="home" class="page">
                <app-navbar></app-navbar>
                <div class="hero">
                    <img src="./assets/img/mariogz.png" alt="mariogz">
                    <h1 class="hero-text-lg">
                        Dive headfirst into the heart-pounding action, thrilling adventures, and pure excitement offered by the hottest games in the industry. <span><b>G</b>ame<b>Z</b>one</span> is not just a platform; it's your portal to an electrifying gaming experience !
                    </h1>
                    <h1 class="hero-text-sm">
                        Welcome to <span><b>G</b>ame<b>Z</b>one</span> : Where Gaming Thrills Begin ! 
                    </h1>
                    <div class="links">
                        <a href="#games" class="gamebtn">
                            Game List
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M19.1266 11.6961C19.1266 11.4625 19.0287 11.2365 18.8554 11.0708L13.9059 6.1213C13.71 5.93297 13.5066 5.8501 13.2957 5.8501C12.8135 5.8501 12.467 6.1891 12.467 6.64865C12.467 6.88972 12.5649 7.09312 12.7156 7.24379L14.4106 8.96143L16.5954 10.9578L14.8476 10.8523H5.71701C5.21226 10.8523 4.86572 11.1989 4.86572 11.6961C4.86572 12.1858 5.21226 12.5323 5.71701 12.5323H14.8476L16.5954 12.4268L14.4106 14.4232L12.7156 16.1408C12.5649 16.2915 12.467 16.4949 12.467 16.736C12.467 17.1955 12.8135 17.5345 13.2957 17.5345C13.5066 17.5345 13.71 17.4517 13.8908 17.2784L18.8554 12.3138C19.0287 12.1481 19.1266 11.9221 19.1266 11.6961Z" fill="#F9FAFB"/>
                            </svg>
                        </a>
                        <a href="#forum" class="forumbtn">
                            Forum
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M8.16539 20.1485C8.47426 20.1485 8.71533 19.9978 9.08447 19.6513L11.8568 17.1502H16.7988C19.0663 17.1577 20.3395 15.8544 20.3395 13.617V7.771C20.3395 5.53355 19.0663 4.23779 16.7988 4.23779H7.19357C4.92599 4.23779 3.65283 5.53355 3.65283 7.771V13.617C3.65283 15.8544 4.95612 17.1502 7.14083 17.1502H7.44217V19.3349C7.44217 19.8246 7.71338 20.1485 8.16539 20.1485ZM8.01472 8.63735C7.74351 8.63735 7.53258 8.41134 7.53258 8.14014C7.53258 7.87646 7.74351 7.65799 8.01472 7.65799H15.9023C16.1735 7.65799 16.392 7.87646 16.392 8.14014C16.392 8.41134 16.1735 8.63735 15.9023 8.63735H8.01472ZM8.01472 11.1234C7.74351 11.1234 7.53258 10.9049 7.53258 10.6337C7.53258 10.37 7.74351 10.144 8.01472 10.144H15.9023C16.1735 10.144 16.392 10.37 16.392 10.6337C16.392 10.9049 16.1735 11.1234 15.9023 11.1234H8.01472ZM8.01472 13.617C7.74351 13.617 7.53258 13.3985 7.53258 13.1348C7.53258 12.8561 7.74351 12.6376 8.01472 12.6376H13.1526C13.4238 12.6376 13.6422 12.8561 13.6422 13.1348C13.6422 13.3985 13.4238 13.617 13.1526 13.617H8.01472Z" fill="#374151"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        `
    }
}   

window.customElements.define('app-home', HomeComponent);