import { useEffect, useState } from "react";
import { getMovieCredits } from "../../movies-api";
import css from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCreditsById() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieCredits(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getCreditsById();
  }, [movieId]);

  return (
    <div className={css.wrap}>
      <ul>
        {cast.map((item) => {
          return (
            <li key={item.id}>
              {item.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${item.profile_path}`}
                  alt={item.original_name}
                />
              )}
              <p>{item.original_name}</p>
              <p>Character: {item.character}</p>
            </li>
          );
        })}
      </ul>
      {error && <ErrorMessage />}
      {loading && <Loader />}
    </div>
  );
};
export default MovieCast;
