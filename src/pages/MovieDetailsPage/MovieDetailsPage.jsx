import { useEffect, useRef, useState, Suspense } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../movies-api";
import css from "./MovieDetailsPage.module.css";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkUrlRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function getMovieById() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovieById();
  }, [movieId]);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <div className={css.wrap}>
      <div className={css.linkBack}>
        <Link to={backLinkUrlRef.current}>Go back</Link>
      </div>
      <ul>
        <li className={css.item}>
          <img
            src={
              movies.backdrop_path
                ? `https://image.tmdb.org/t/p/w500/${movies.backdrop_path}`
                : defaultImg
            }
            alt={movies.original_title}
            width={500}
          />

          <div className={css.movieDesc}>
            <h2 className={css.movieTitle}>{movies.original_title}</h2>
            <div className={css.wrapScore}>
              <p className={css.movieText}>
                Release date: {movies.release_date}
              </p>
              {movies.vote_average && (
                <p className={css.movieText}>
                  User score: {movies.vote_average}
                </p>
              )}
            </div>
            {movies.overview && (
              <div className={css.wrapOverview}>
                <h4>Overview</h4>
                <p>{movies.overview}</p>
              </div>
            )}
            {movies.genres && (
              <div className={css.wrapGenres}>
                <h4>Genres</h4>
                <p>
                  {movies.genres.map((genre) => (
                    <ul key={genre.id} className={css.genresList}>
                      <li>{genre.name}</li>
                    </ul>
                  ))}
                </p>
              </div>
            )}
            {movies.production_countries && (
              <div>
                <h4>Country</h4>
                <p>
                  {movies.production_countries.map((country) => (
                    <ul
                      key={movies.production_countries.indexOf("country.name")}
                      className={css.countriesList}
                    >
                      <li>{country.name}</li>
                    </ul>
                  ))}
                </p>
              </div>
            )}
          </div>
        </li>
      </ul>
      <hr />

      <div className={css.infoDesc}>
        <h4>Additional information</h4>
        <ul>
          <li>
            <Link to="cast" className={css.infoLink}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" className={css.infoLink}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <hr />

      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>

      {error && <ErrorMessage />}
      {loading && <Loader />}
    </div>
  );
};
export default MovieDetailsPage;
