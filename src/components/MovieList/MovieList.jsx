import { Link, useLocation } from "react-router-dom";
import { CiVault } from "react-icons/ci";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul>
      {movies.map((movie) => {
        return (
          <li key={movie.id}>
            <div className={css.wrapLink}>
              <CiVault className={css.icon} width={14} />
              <Link
                to={`/movies/${movie.id}`}
                className={css.link}
                state={location}
              >
                {movie.original_title}
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
