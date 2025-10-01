import axios from "axios";

const API_KEY = "15d2ea6d0dc1d476efbca3eba2b9bbfb";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "pt-BR",
  },
});

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await api.get("/movie/popular", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar filmes populares:", error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get("/search/movie", {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await api.get(`/movie/${id}`, {
      params: {
        append_to_response: "credits,videos",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
    throw error;
  }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await api.get("/discover/movie", {
      params: {
        with_genres: genreId,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar filmes por gênero:", error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await api.get("/genre/movie/list");
    return response.data.genres;
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
    throw error;
  }
};

export const getImageUrl = (path, size = "w500") => {
  if (!path) return "https://via.placeholder.com/500x750?text=Sem+Imagem";
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export default api;
