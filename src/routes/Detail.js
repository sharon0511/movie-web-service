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
  }

  const onErrorBackImg = (event) => {
    event.target.src = defaultBackImg;
  }

  console.log(movie)

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? <Load /> : (
        <div>
          <div className={styles.background}>
            <img className={styles.bgImg} src={movie.background_image_original} alt="" onError={onErrorBackImg} />
          </div>
          <div className={styles.show}>
            {/* ShortView (Img, Title, rating, runtime...) */}
            <div className={styles.shortView}>
              {/* Img */}
              <img src={movie.large_cover_image} className={styles.shortViewImg} onError={onErrorImg}></img>
              {/* title, rating, runtime, genre */}
              <div className={styles.shortViewLetters}>
                <h1>{movie.title}</h1>
                <div className={styles.smallTitle}>Runtime</div> {movie.runtime}min
                <div className={styles.smallTitle}>Rating</div> {movie.rating} / 10
                {/* Star Rating
                <div className={styles.star}>
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div> */}
                <h2>Genre</h2>
                <ul>
                  {movie.genres.map((genre) => (
                    <li key={genre}>
                      {genre}
                    </li>
                  ))}
                </ul>
                <p>{movie.description_intro.length > 1400 ? `${movie.description_intro.slice(0, 1400)}...` : movie.description_intro}</p>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </div >
  )
}

export default Detail;