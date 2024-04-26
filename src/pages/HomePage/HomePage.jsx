import css from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { getTrendMovie } from "../../movies-api";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setLoading(true);
        setError(false);
        const data = await getTrendMovie();
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
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
      {error && <ErrorMessage />}
      {loading && <Loader />}
    </div>
  );
};
export default HomePage;
