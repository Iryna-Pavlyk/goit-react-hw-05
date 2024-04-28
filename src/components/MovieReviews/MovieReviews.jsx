import css from "./MovieReviews.module.css";
import { getMovieReviews } from "../../movies-api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviewsById() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getReviewsById();
  }, [movieId]);

  return (
    <div className={css.wrap}>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => {
            return (
              <li key={review.id}>
                <b>Author: {review.author}</b>
                <p>{review.content}</p>
                <hr />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don`t have any reviews for this movie.</p>
      )}

      {error && <ErrorMessage />}
      {loading && <Loader />}
    </div>
  );
};

export default MovieReviews;
