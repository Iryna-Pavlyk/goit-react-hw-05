import css from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { getTrendMovie } from "../../movies-api";
import { useEffect, useState } from "react";

// `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      const data = await getTrendMovie();
      setMovies((prevMovies) => [...prevMovies, ...data]);
    }
    getMovies();
  }, []);

  return (
    <div className={css.wrap}>
      <h2>Trending today</h2>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default HomePage;
