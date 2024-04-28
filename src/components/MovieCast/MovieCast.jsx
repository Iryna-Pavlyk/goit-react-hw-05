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
    if (!movieId) return;

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

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <div className={css.wrap}>
      {cast.length > 0 ? (
        <ul>
          {cast.map((item) => {
            return (
              <li key={item.id}>
                <img
                  src={
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/w200/${item.profile_path}`
                      : defaultImg
                  }
                  alt={item.original_name}
                  width={200}
                />

                <p>{item.original_name}</p>
                {item.character && <p>Character: {item.character}</p>}
                <hr />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don`t have cast for this movie.</p>
      )}
      {error && <ErrorMessage />}
      {loading && <Loader />}
    </div>
  );
};
export default MovieCast;
