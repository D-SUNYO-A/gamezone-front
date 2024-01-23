import { postsUrl } from "../utils/urls.js";
import { eventBus } from "./EventBus.js";

export const postService = new class {
    constructor() {}

    getPostData = async () => {
        try {
            const response = await fetch(postsUrl);
      
            if (!response.ok) {
              throw new Error("Erreur lors de la récupération des données.");
            }
      
            const data = await response.json();
      
            eventBus.fire("dataReady", this);
      
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}