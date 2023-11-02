import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css"

function Movie({ id, coverImg, title, summary, genres, rate, year }) {
  return (
    <div className={styles.container}>
      <img src={coverImg} alt={title} />
      <div className={styles.genre}>{genres[0]}</div>
      <div>
        <p>
          <Link to={`/movie/${id}`}>{title.length < 25 ? title : `${title.slice(0, 25)}...`}</Link>
        </p>
      </div>
      <div className={styles.year}>
        <p>{year}</p>
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
    </div >
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