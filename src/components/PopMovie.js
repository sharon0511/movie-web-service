import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./PopMovie.module.css"

function PopMovie({ id, coverImg, title, summary, genres, rate, year }) {
  return (
    <div className={styles.container}>
      <img src={coverImg} alt={title} className={styles.img} />
      <div className={styles.title}>
        <Link to={`/movie/${id}`}>{title}</Link>
      </div>
      <br />
      <div className={styles.year}>
        <p>{year}</p>
      </div>
      <div className={styles.genre}>{genres[0]}</div>
      <div className={styles.rate}>⭐{Number.isInteger(rate) ? `${rate}.0` : rate}</div>
    </div >
  );
}

PopMovie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default PopMovie;