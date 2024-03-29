import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./cssModule/Movie.module.css"
import defaultImg from "../img/default_Img.jpeg";
function Movie({ id, coverImg, title, summary, genres, rate, year }) {
  const onErrorImg = (event) => {
    event.target.src = defaultImg;
  }

  return (
    <div className={styles.container}>
      <Link to={`/movie/${id}`}><figure><img src={coverImg} alt="" onError={onErrorImg} /></figure></Link>
      <div className={styles.genre}>{genres[0]}</div>
      <br />
      <div className={styles.info}>
        <Link to={`/movie/${id}`}>{title.length < 25 ? title : `${title.slice(0, 25)}...`}</Link>
        <br />
        <Link to={`/movie/${id}`}><p>{year}</p></Link>
      </div>
      {/* <p>{summary}</p>
      <ul>
        {genres.map((genre) => (
          <li key={genre}>
            {genre}
          </li>
        ))}
      </ul> */}
      <div className={styles.rate}>⭐{Number.isInteger(rate) ? `${rate}.0` : rate}</div>
    </div>

  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Movie;