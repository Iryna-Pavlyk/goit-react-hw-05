import { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { searchMovie } from "../../movies-api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  // const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") ?? "";

  const changeQueryFilter = (newFilter) => {
    searchParams.set("query", newFilter);
    setSearchParams(searchParams);
  };

  const location = useLocation();

  useEffect(() => {
    if (queryParam === "") {
      return;
    }

    async function getSearchMovie() {
      try {
        setError(false);
        setLoading(true);
        const data = await searchMovie(queryParam);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getSearchMovie();
  }, [queryParam]);

  const filteredValues = useMemo(() => {
    return movies.filter((movie) =>
      movie.original_title.toLowerCase().includes(queryParam.toLowerCase())
    );
  }, [movies, queryParam]);

  return (
    <div className={css.wrap}>
      <input
        type="text"
        value={queryParam}
        onChange={(evt) => changeQueryFilter(evt.target.value)}
      />

      {/* <form onSubmit={(evt) => changeQueryFilter(evt.target.value)}>
        <input
          type="text"
          value={queryParam}
          onChange={(evt) => changeQueryFilter(evt.target.value)}
        />
        <button type="submit">Search</button>
      </form> */}

      <div>
        <ul>
          {filteredValues.map((value) => {
            return (
              <li key={value.id}>
                <Link to={`/movies/${value.id}`} state={location}>
                  {value.original_title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {error && <ErrorMessage />}
      {loading && <Loader />}
    </div>
  );
};

export default MoviesPage;
