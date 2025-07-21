import { useEffect, useState } from "react";
import Load from "../components/Load";
import Movie from "../components/Movie";
import PopMovie from "../components/PopMovie";
import styles from "../components/cssModule/Home.module.css";
import YouTube from "react-youtube";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [popMovies, setPopMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=7&sort_by=year"
      )
    ).json();
    setMovies(json.data.movies);
  };

  const getPopMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
      )
    ).json();
    setPopMovies(json.data.movies.slice(0, 8));
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
    getPopMovies();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <Load />
      ) : (
        <>
          <div className={styles.youtube}>
            <YouTube
              videoId={
                popMovies[0].yt_trailer_code === ""
                  ? popMovies[1].yt_trailer_code
                  : popMovies[0].yt_trailer_code
              }
              opts={{
                width: "100%",
                height: "700",
                playerVars: {
                  autoplay: 1,
                  rel: 0,
                  modestbranding: 1,
                },
              }}
              onEnd={(e) => {
                e.target.stopVideo(0);
              }}
            />
          </div>

          <div className={styles.flexWrapper}>
            <div className={styles.left}>
              <h1 className={styles.newMovies}>New Movies</h1>
              <div className={styles.gridContainer}>
                {movies.map((movie) => (
                  <Movie
                    key={movie.id}
                    id={movie.id}
                    coverImg={movie.medium_cover_image}
                    title={movie.title}
                    summary={movie.summary}
                    genres={movie.genres}
                    rate={movie.rating}
                    year={movie.year}
                  />
                ))}
              </div>
            </div>

            <div className={styles.right}>
              <h1>High Rating</h1>
              {popMovies.map((popMovie) => (
                <PopMovie
                  key={popMovie.id}
                  id={popMovie.id}
                  coverImg={popMovie.medium_cover_image}
                  title={popMovie.title}
                  summary={popMovie.summary}
                  genres={popMovie.genres}
                  rate={popMovie.rating}
                  year={popMovie.year}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;