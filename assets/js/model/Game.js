export default class Game {
  constructor(id, cover, name, summary, platforms, genres, themes, screenshots, videos) {
    this.id = id;
    this.cover = cover;
    this.name = name;
    this.summary = summary;
    this.platforms = platforms;
    this.genres = genres;
    this.themes = themes;
    this.screenshots = screenshots;
    this.videos = videos;
  }
}
