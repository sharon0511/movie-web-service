import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./cssModule/MoviesGroup.module.css"
import defaultImg from "../img/default_Img.jpeg";

function MoviesGroup({ id, coverImg, title, summary, genres, rate, year }) {
  const onErrorImg = (event) => {
    event.target.src = defaultImg;
  }

  return (
    <div className={styles.container}>
      <Link to={`/movie/${id}`}><figure><img src={coverImg} alt="" onError={onErrorImg} /></figure></Link>
      <br />
      <div className={styles.info}>
        <Link to={`/movie/${id}`}>{title.length < 25 ? title : `${title.slice(0, 25)}...`}</Link>
        <br />
        <Link to={`/movie/${id}`}><p>{year}</p></Link>
      </div>
    </div>
  );
}

MoviesGroup.propTypes = {
  id: PropTypes.number,
  coverImg: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string)
}

export default MoviesGroup;