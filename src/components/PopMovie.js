import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./cssModule/PopMovie.module.css"
import defaultImg from "../img/default_Img.jpeg";
function PopMovie({ id, coverImg, title, summary, genres, rate, year }) {
  const onErrorImg = (event) => {
    event.target.src = defaultImg;
  }

  return (
    <Link to={`/movie/${id}`}>
      <div className={styles.container}>
        <img src={coverImg} alt="" className={styles.img} onError={onErrorImg} />
        <div className={styles.title}>
          {title}
        </div>
        <br />
        <div className={styles.year}>
          <p>{year}</p>
        </div>
        <div className={styles.genre}>{genres[0]}</div>
        <div className={styles.rate}>⭐{Number.isInteger(rate) ? `${rate}.0` : rate}</div>
      </div>
    </Link>
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