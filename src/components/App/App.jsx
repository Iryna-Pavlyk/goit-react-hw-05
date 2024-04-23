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
