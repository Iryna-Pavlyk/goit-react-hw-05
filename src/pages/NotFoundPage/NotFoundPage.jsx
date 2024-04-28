import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.wrap}>
      <p> Not Found Page. Please go to the </p>
      <p className={css.link}>
        <Link to="/">Home Page</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
