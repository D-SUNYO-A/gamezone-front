export default class AboutComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.render();
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/index.css">
            <link rel="stylesheet" href="./assets/css/about.css">

            <div id="about" class="page">
                <app-navbar></app-navbar>
                <main class="about-grid">
                    <article class="about">
                        <h1>About GameZone</h1>
                        <p>
                            Welcome to GameZone, your ultimate destination to discover and explore the world of video games! I am Sunyo, the founder, and the sole contributor to GameZone. Passionate about video games and content creation, I launched this project to share my passion with the gaming community worldwide.
                        </p>
                    </article>
                    <article class="about">
                        <h1>Who am I ?</h1>
                        <p>
                            I am a web developer and a gamer. My journey in the gaming industry inspired me to create a platform dedicated to games of all kinds.
                        </p>
                    </article>
                    <article class="about">
                        <h1>Mission & Goals</h1>
                        <p>
                            The mission of GameZone is to provide an immersive experience for video game enthusiasts. Whether you're a casual gamer or a longtime fan, here you will find articles, reviews, and recommendations to enrich your gaming experience.
                        </p>
                        <div class="tasks">
                            <div class="task">
                                <img src="./assets/img/chevron.png" alt="chevron">
                                Provide honest and objective reviews of the latest games.
                            </div>
                            <div class="task">
                                <img src="./assets/img/chevron.png" alt="chevron">
                                Share important industry news and updates.
                            </div>
                            <div class="task">
                                <img src="./assets/img/chevron.png" alt="chevron">
                                Create a community where gamers can exchange ideas and discuss their favorite games.
                            </div>
                            <div class="task">
                                <img src="./assets/img/chevron.png" alt="chevron">
                                Offer a user-friendly and accessible platform for all types of gamers.
                            </div>
                        </div>
                    </article>
                    <article class="about">
                        <h1>Contact</h1>
                        <p>
                            Feel free to contact me with any questions, suggestions, or collaborations. You can reach me via email at sdanarson@gmail.com or through social media on
                        </p>
                        <div class="s-media">
                            <a href="https://github.com/D-SUNYO-A">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                    <path d="M12.7666 2C11.4534 2 10.153 2.25866 8.93977 2.7612C7.72651 3.26375 6.62412 4.00035 5.69553 4.92893C3.82017 6.8043 2.7666 9.34784 2.7666 12C2.7666 16.42 5.6366 20.17 9.6066 21.5C10.1066 21.58 10.2666 21.27 10.2666 21V19.31C7.4966 19.91 6.9066 17.97 6.9066 17.97C6.4466 16.81 5.7966 16.5 5.7966 16.5C4.8866 15.88 5.8666 15.9 5.8666 15.9C6.8666 15.97 7.3966 16.93 7.3966 16.93C8.2666 18.45 9.7366 18 10.3066 17.76C10.3966 17.11 10.6566 16.67 10.9366 16.42C8.7166 16.17 6.3866 15.31 6.3866 11.5C6.3866 10.39 6.7666 9.5 7.4166 8.79C7.3166 8.54 6.9666 7.5 7.5166 6.15C7.5166 6.15 8.3566 5.88 10.2666 7.17C11.0566 6.95 11.9166 6.84 12.7666 6.84C13.6166 6.84 14.4766 6.95 15.2666 7.17C17.1766 5.88 18.0166 6.15 18.0166 6.15C18.5666 7.5 18.2166 8.54 18.1166 8.79C18.7666 9.5 19.1466 10.39 19.1466 11.5C19.1466 15.32 16.8066 16.16 14.5766 16.41C14.9366 16.72 15.2666 17.33 15.2666 18.26V21C15.2666 21.27 15.4266 21.59 15.9366 21.5C19.9066 20.16 22.7666 16.42 22.7666 12C22.7666 10.6868 22.5079 9.38642 22.0054 8.17317C21.5029 6.95991 20.7663 5.85752 19.8377 4.92893C18.9091 4.00035 17.8067 3.26375 16.5934 2.7612C15.3802 2.25866 14.0798 2 12.7666 2Z" fill="#1F2937"/>
                                </svg>
                            </a>
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                    <g clip-path="url(#clip0_278_660)">
                                        <path d="M1.27869 11.8563C1.27813 13.8728 1.80913 15.8417 2.81882 17.5771L1.18213 23.5066L7.29763 21.9156C8.98909 22.8292 10.8843 23.308 12.8101 23.3081H12.8152C19.1728 23.3081 24.3481 18.1748 24.3508 11.8653C24.3521 8.80792 23.1532 5.93295 20.975 3.76997C18.7972 1.60718 15.9008 0.415458 12.8147 0.414062C6.45632 0.414062 1.28141 5.54709 1.27879 11.8563" fill="url(#paint0_linear_278_660)"/>
                                        <path d="M0.866914 11.8527C0.866258 13.9417 1.41629 15.981 2.46198 17.7786L0.766602 23.9207L7.10138 22.2726C8.84682 23.2168 10.812 23.7147 12.8117 23.7154H12.8169C19.4026 23.7154 24.7638 18.3975 24.7666 11.8621C24.7677 8.69488 23.5257 5.71656 21.2697 3.47609C19.0134 1.23591 16.0134 0.00130233 12.8169 0C6.22998 0 0.869539 5.31721 0.866914 11.8527ZM4.63941 17.469L4.40288 17.0965C3.40857 15.5277 2.88376 13.7149 2.88451 11.8534C2.88666 6.4213 7.34204 2.00186 12.8206 2.00186C15.4737 2.00298 17.9671 3.02921 19.8425 4.89116C21.7178 6.7533 22.7497 9.22865 22.749 11.8614C22.7466 17.2935 18.2911 21.7135 12.8169 21.7135H12.8129C11.0304 21.7126 9.28229 21.2376 7.75773 20.34L7.39491 20.1265L3.63573 21.1045L4.63941 17.4689V17.469Z" fill="url(#paint1_linear_278_660)"/>
                                        <path d="M9.83019 6.89771C9.6065 6.4044 9.37109 6.39445 9.15837 6.3858C8.98419 6.37836 8.78506 6.37892 8.58612 6.37892C8.387 6.37892 8.06347 6.45324 7.79 6.74952C7.51625 7.04608 6.74487 7.76273 6.74487 9.22031C6.74487 10.678 7.81484 12.0866 7.964 12.2845C8.11334 12.482 10.0296 15.5689 13.0645 16.7564C15.5867 17.7433 16.1 17.547 16.6474 17.4975C17.1949 17.4482 18.414 16.7811 18.6627 16.0892C18.9117 15.3975 18.9117 14.8046 18.837 14.6807C18.7624 14.5572 18.5633 14.4831 18.2647 14.335C17.966 14.1868 16.4981 13.4701 16.2244 13.3712C15.9507 13.2724 15.7516 13.2231 15.5525 13.5198C15.3534 13.8159 14.7816 14.4831 14.6073 14.6807C14.4332 14.8787 14.2589 14.9034 13.9604 14.7552C13.6617 14.6065 12.7001 14.2941 11.5592 13.2849C10.6716 12.4996 10.0723 11.5298 9.89815 11.2331C9.72397 10.937 9.8795 10.7764 10.0292 10.6288C10.1634 10.496 10.3279 10.2828 10.4773 10.1099C10.6262 9.93687 10.6759 9.81343 10.7755 9.61585C10.8751 9.41808 10.8252 9.24506 10.7507 9.09687C10.6759 8.94868 10.0957 7.48347 9.83019 6.89771Z" fill="white"/>
                                    </g>
                                    <defs>
                                        <linearGradient id="paint0_linear_278_660" x1="1159.62" y1="2309.67" x2="1159.62" y2="0.414062" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#1FAF38"/>
                                        <stop offset="1" stop-color="#60D669"/>
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_278_660" x1="1200.77" y1="2392.07" x2="1200.77" y2="0" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F9F9F9"/>
                                        <stop offset="1" stop-color="white"/>
                                        </linearGradient>
                                        <clipPath id="clip0_278_660">
                                        <rect width="24" height="24" fill="white" transform="translate(0.766602)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/sunyo-aldrich-danarson-b55218268/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                    <path d="M19.7666 3C20.297 3 20.8057 3.21071 21.1808 3.58579C21.5559 3.96086 21.7666 4.46957 21.7666 5V19C21.7666 19.5304 21.5559 20.0391 21.1808 20.4142C20.8057 20.7893 20.297 21 19.7666 21H5.7666C5.23617 21 4.72746 20.7893 4.35239 20.4142C3.97732 20.0391 3.7666 19.5304 3.7666 19V5C3.7666 4.46957 3.97732 3.96086 4.35239 3.58579C4.72746 3.21071 5.23617 3 5.7666 3H19.7666ZM19.2666 18.5V13.2C19.2666 12.3354 18.9231 11.5062 18.3118 10.8948C17.7004 10.2835 16.8712 9.94 16.0066 9.94C15.1566 9.94 14.1666 10.46 13.6866 11.24V10.13H10.8966V18.5H13.6866V13.57C13.6866 12.8 14.3066 12.17 15.0766 12.17C15.4479 12.17 15.804 12.3175 16.0666 12.5801C16.3291 12.8426 16.4766 13.1987 16.4766 13.57V18.5H19.2666ZM7.6466 8.56C8.09217 8.56 8.51948 8.383 8.83454 8.06794C9.1496 7.75288 9.3266 7.32556 9.3266 6.88C9.3266 5.95 8.5766 5.19 7.6466 5.19C7.19839 5.19 6.76853 5.36805 6.45159 5.68499C6.13465 6.00193 5.9566 6.43178 5.9566 6.88C5.9566 7.81 6.7166 8.56 7.6466 8.56ZM9.0366 18.5V10.13H6.2666V18.5H9.0366Z" fill="#0A66C2"/>
                                </svg>
                            </a>
                        </div>
                        <p>
                            Thank you for being part of the GameZone community !
                        </p>
                        <p>Happy gaming ! 🎮</p>
                    </article>
                </main>
            </div>
        `
    }
}   

window.customElements.define('app-about', AboutComponent);