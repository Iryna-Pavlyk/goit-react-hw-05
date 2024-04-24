import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.wrap}>
      Not Found Page. Please go to the
      <Link to="/">Home Page</Link>
    </div>
  );
};

export default NotFoundPage;
