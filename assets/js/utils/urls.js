// Base URL
export const baseUrl = "http://localhost:3000";

// All posts URL 
export const postsUrl = `${baseUrl}/api/posts`; 

// Get one post by Id
export const getPostUrl = (postId) => {
    return `${baseUrl}/api/post/${postId}`
}

// Initial Games URL
export const initialGamesUrl = `${baseUrl}/initialgames`;

// All games URL
export const gamesUrl = `${baseUrl}/games`;

// Game search URL
export const gameSearchUrl = (searchTerm) => {
    return `${gamesUrl}/search?term=${encodeURIComponent(searchTerm)}`
};

// Platform URL
export const platformsUrl = `${baseUrl}/platforms`;

// Genre URL
export const genresUrl = `${baseUrl}/genres`;

// Theme URL
export const themesUrl = `${baseUrl}/themes`;