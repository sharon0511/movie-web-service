import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Load from "../components/Load";
import styles from "../components/cssModule/Detail.module.css";
import defaultBackImg from "../img/default_back.jpeg";
import defaultImg from "../img/default_Img.jpeg";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);

  const getMovie = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      )
    ).json();
    setLoading(false);
    setMovie(json.data.movie);
  };

  const onErrorImg = (event) => {
    event.target.src = defaultImg;
  };

  const onErrorBackImg = (event) => {
    event.target.src = defaultBackImg;
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <Load />
      ) : (
        <>
          <div className={styles.background}>
            <img src={movie.background_image_original} alt="background" onError={onErrorBackImg} />
          </div>
          <div className={styles.show}>
            <img
              src={movie.medium_cover_image}
              alt={movie.title}
              onError={onErrorImg}
              className={styles.poster}
            />
            <div className={styles.infoBox}>
              <h1>{movie.title}</h1>
              <div className={styles.meta}>
                {movie.year} · ⭐ {movie.rating}
              </div>
              <div className={styles.genres}>
                {movie.genres.map((g, idx) => (
                  <span className={styles.genreTag} key={idx}>{g}</span>
                ))}
              </div>
              <p className={styles.description}>{movie.description_full.length > 1400 ? `${movie.description_full.slice(0, 1400)}...` : movie.description_full}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Detail;