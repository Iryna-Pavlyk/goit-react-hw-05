import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_KEY = "6e662dec114f18736bafeb49ccd5fe2c";

const options = {
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTY2MmRlYzExNGYxODczNmJhZmViNDljY2Q1ZmUyYyIsInN1YiI6IjY2MjdjMTFkMmUyYjJjMDE2MzY3OWE0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aW67E9Kj2wZqqFKkxi4hn8itzsPWtpm8iNql3fjutYE",
  },
};

const getTrendMovie = (query, page) => {
  const response = axios.get("/trending/movie/day", {
    params: {
      options,
      query: query,
      api_key: API_KEY,
      page: page,
      include_adult: false,
      language: "en",
    },
  });

  return response.data.results;
};

export default getTrendMovie;
