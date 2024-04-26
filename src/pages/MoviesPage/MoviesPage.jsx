import { useEffect, useState } from "react";
import { searchMovie } from "../../movies-api";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("batman");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getSearchMovie() {
      const data = await searchMovie(query);
      setMovies([data]);
    }
    getSearchMovie();
  }, [query]);

  return <div className={css.wrap}></div>;
};

export default MoviesPage;
