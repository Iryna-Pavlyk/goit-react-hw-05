// import { useState } from 'react'
import css from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import MovieCast from "../MovieCast/MovieCast";
import MovieRewiews from "../MovieReviews/MovieReviews";
import Navigation from "../Navigation/Navigation";
import HomePage from "../../pages/HomePage/HomePage";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
// import axios from "axios";

// const API_KEY = "6e662dec114f18736bafeb49ccd5fe2c";
// axios.defaults.baseURL = "https://api.themoviedb.org/3/search/movie";
// const options = {
//   headers: {
//     Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTY2MmRlYzExNGYxODczNmJhZmViNDljY2Q1ZmUyYyIsInN1YiI6IjY2MjdjMTFkMmUyYjJjMDE2MzY3OWE0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aW67E9Kj2wZqqFKkxi4hn8itzsPWtpm8iNql3fjutYE",
//   },
// };

const App = () => {
  return (
    <div className={css.wrapper}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/moviedetails" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="rewiews" element={<MovieRewiews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
