import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovie } from "../../movies-api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") ?? "";

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const value = form.elements.search.value.trim();
    value && setSearchParams({ query: value });
    form.reset();
  };

  useEffect(() => {
    async function getSearchMovie(searchQuery) {
      try {
        setMovies([]);
        setError(false);
        setLoading(true);
        const data = await searchMovie(searchQuery);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getSearchMovie(queryParam);
  }, [queryParam]);

  const filteredValues = useMemo(() => {
    return movies.filter((movie) =>
      movie.original_title.toLowerCase().includes(queryParam.toLowerCase())
    );
  }, [movies, queryParam]);

  return (
    <div className={css.wrap}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="text"
          name="search"
          placeholder="Search movies"
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>

      <MovieList movies={filteredValues} />

      {error && <ErrorMessage />}
      {loading && <Loader />}
    </div>
  );
};

export default MoviesPage;
