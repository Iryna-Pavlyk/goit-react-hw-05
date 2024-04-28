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
  //
  console.log(reviews);
  //
  return (
    <div className={css.wrap}>
      <ul>
        {reviews.map((review) => {
          return (
            <li key={review.id}>
              <b>Author: {review.author}</b>
              <p>Created: {review.created_at.slice(0, 10)}</p>
              <p>{review.content}</p>
              <hr />
            </li>
          );
        })}
      </ul>

      {error && <ErrorMessage />}
      {loading && <Loader />}
    </div>
  );
};

export default MovieReviews;
