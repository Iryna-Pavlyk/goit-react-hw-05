import css from "./HomePage.module.css";
import getTrendMovie from "../../movies-api";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      const data = await getTrendMovie();
      setMovies((prevMovies) => [...prevMovies, ...data]);
      console.log(getTrendMovie());
    }
    getMovies();
  }, []);

  return (
    <div className={css.wrap}>
      <h2>Trending today</h2>
      <ul>
        <li></li>
      </ul>
    </div>
  );
};
export default HomePage;
