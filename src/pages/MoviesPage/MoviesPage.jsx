import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchMovie } from "../../movies-api";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("batman");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getSearchMovie() {
      const data = await searchMovie(query);
      setMovies(data);
    }
    getSearchMovie();
  }, [query]);

  const filteredValues = movies.filter((movie) =>
    movie.original_title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={css.wrap}>
      <form onSubmit={(evt) => setQuery(evt.target.value)}>
        <input
          type="text"
          value={query}
          onChange={(evt) => setQuery(evt.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <ul>
          {filteredValues.map((value) => {
            return (
              <li key={value.id}>
                <Link to={`/movies/${value.id}`}>{value.original_title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MoviesPage;
