import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_KEY = "6e662dec114f18736bafeb49ccd5fe2c";
const API_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTY2MmRlYzExNGYxODczNmJhZmViNDljY2Q1ZmUyYyIsInN1YiI6IjY2MjdjMTFkMmUyYjJjMDE2MzY3OWE0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aW67E9Kj2wZqqFKkxi4hn8itzsPWtpm8iNql3fjutYE";

const options = {
  headers: {
    Authorization: API_TOKEN,
  },
  include_adult: false,
  language: "en",
};

export const getTrendMovie = async () => {
  const response = await axios.get("/trending/movie/day", {
    params: {
      options,
      api_key: API_KEY,
    },
  });

  return response.data.results;
};

export const searchMovie = async (query) => {
  const response = await axios.get("/search/movie", {
    params: {
      options,
      query: query,
      api_key: API_KEY,
    },
  });

  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, {
    params: {
      options,
      api_key: API_KEY,
    },
  });
  return response.data.results;
};

export const getMovieCredits = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, {
    params: {
      options,
      api_key: API_KEY,
    },
  });

  return response.data.results;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, {
    params: {
      options,
      api_key: API_KEY,
    },
  });

  return response.data.results;
};
