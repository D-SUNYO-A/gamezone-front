import { initialGamesUrl, gamesUrl, gameSearchUrl } from "../utils/urls.js";
import { eventBus } from "./EventBus.js";
import Game from '../model/Game.js'

export const gameService = new (class {
  constructor() {}

  getInitialGameData = async () => {
    try {
      const response = await fetch(initialGamesUrl);

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données de jeux.");
      }

      const data = await response.json();

      eventBus.fire("dataReady", this);

      return data.map(gameData => {
        // Vérifiez si la clé "cover" existe dans gameData
        const cover = gameData.hasOwnProperty("cover") ? gameData.cover : "./assets/img/place_cover.jpg";
        return new Game(gameData.id, cover, gameData.name, gameData.summary, gameData.platforms, gameData.genres, gameData.themes, gameData.screenshots, gameData.videos);
      });
    } catch (error) {
      console.error(error);
    }
  };

  getGameData = async () => {
    try {
      const response = await fetch(gamesUrl);

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données de jeux.");
      }

      const data = await response.json();

      eventBus.fire("dataReady", this);

      return data.map(gameData => {
        // Vérifiez si la clé "cover" existe dans gameData
        const cover = gameData.hasOwnProperty("cover") ? gameData.cover : "./assets/img/place_cover.jpg";
        return new Game(gameData.id, cover, gameData.name, gameData.summary, gameData.platforms, gameData.genres, gameData.themes, gameData.screenshots, gameData.videos)
      });
    } catch (error) {
      console.error(error);
    }
  };

  searchGameData = async (searchTerm) => {
    try {
      const response = await fetch(gameSearchUrl(searchTerm));

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données de recherche.");
      }

      const data = await response.json();

      return data.map(gameData => {
        const cover = gameData.hasOwnProperty("cover") ? gameData.cover : "./assets/img/place_cover.jpg";
        return new Game(gameData.id, cover, gameData.name, gameData.summary, gameData.platforms, gameData.genres, gameData.themes, gameData.screenshots, gameData.videos);
      });
    } catch (error) {
      console.error(error);
    }
  };
})();
