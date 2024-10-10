import axios from "axios";

// Access environment variables
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

// Define the function to fetch games
export const fetchGames = async () => {
  try {
    const response = await axios.get(`${API_URL}/games`, {
      params: {
        key: API_KEY,
      },
    });
    return response.data.results; // Axios automatically parses JSON
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};

export const fetchGameBySlug = async (slug: string) => {
  try {
    // RAWG API URL to fetch a specific game by slug
    const response = await axios.get(`${API_URL}/games/${slug}`, {
      params: {
        key: API_KEY, // Pass the API key as a query parameter
      },
    });

    // Return game data from the API response
    return response.data;
  } catch (error) {
    console.error('Error fetching game data:', error);
    return null;
  }
};

// Function to fetch 20 games by genre slug
export const fetchGamesByGenre = async (genreSlug: string,pageNumber:number) => {
  try {
    // Fetch games from the RAWG API by genre
    const response = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        genres: genreSlug,
        page_size: pageNumber,
        key: API_KEY,
      },
    });

    // Extract relevant data: name, background image, and slug
    const games = response.data.results.map((game: any) => ({
      name: game.name,
      img: game.background_image,
      slug: game.slug,
      genres:game.genres
    }));

    console.log(games);
    

    return games;
  } catch (error) {
    console.error("Error fetching games by genre:", error);
    return [];
  }
};

export const fetchGamesByGenreId = async (genreId: number, page: number = 1) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        genres: genreId, // Use the genre ID here
        page: page,
        page_size: 20,
        key: API_KEY,
      },
    });

    // Map the results to the desired format
    const games = response.data.results.map((game: any) => ({
      name: game.name,
      img: game.background_image,
      slug: game.slug,
    }));

    return games; // Return the array of games
  } catch (error) {
    console.error('Error fetching games by genre ID:', error);
    return []; // Return an empty array on error
  }
};



// Fetch games based on search query
export const searchGames = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/games`, {
      params: {
        key: API_KEY,
        search: query,
        page_size: 10,  // Limit results to 10 games
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};

export const getPopularGames = async () => {
  try {
    const response = await axios.get(`${API_URL}/games`, {
      params: {
        key: API_KEY,
        ordering: "-added",
        page_size: 20,
      },
    });
    // Return the name and background image (photo)
    return response.data.results.map((game: any) => ({
      name: game.name,
      background_image: game.background_image,
      slug: game.slug,
    }));
  } catch (error) {
    console.error("Error fetching popular games:", error);
    return [];
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${API_URL}/genres?key=${API_KEY}`);
    const genres = response.data.results.map((genre: any) => ({
      name: genre.name,
      image: genre.image_background,
      id: genre.id,
      slug: genre.slug,
    }));
    return genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

// Function to get 20 random games
export const getRandomGames = async (pageNumber: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/games?key=${API_KEY}&page_size=${pageNumber}`
    );
    const randomGames = response.data.results.map((game: any) => ({
      name: game.name,
      image: game.background_image,
      slug: game.slug,
    }));
    return randomGames;
  } catch (error) {
    console.error("Error fetching random games:", error);
    return [];
  }
};

export const fetchRandomGame = async () => {
  try {
    const pageSize = 20; // Number of games per page (max 40 by RAWG API)

    // Generate a random page number to fetch from
    const randomPage = Math.floor(Math.random() * 100) + 1; // Assuming there are 100 pages of games

    // Fetch games from RAWG API
    const response = await fetch(
      `${API_URL}/games?page=${randomPage}&page_size=${pageSize}&key=${API_KEY}`
    );
    const data = await response.json();

    // Choose a random game from the page's results
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomGame = data.results[randomIndex];

    console.log(randomGame.slug);
    
    return randomGame.slug;
  } catch (error) {
    console.error("Error fetching random game:", error);
  }
};
