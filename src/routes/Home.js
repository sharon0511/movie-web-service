import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import PopMovie from "../components/PopMovie";
import styles from "../components/Home.module.css"

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [popMovies, setPopMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=7&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
  }

  const getPopMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
      )
    ).json();
    setPopMovies(json.data.movies);
    setLoading(false);
  }

  useEffect(() => {
    getMovies();
    getPopMovies();
  }, []);

  console.log(movies)
  console.log(popMovies)

  return (
    <div>
      {loading ? <h1>Loading</h1> : (
        <div>
          {/* New Movies */}
          <div className={styles.left}>
            <h1>New Movies</h1>
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

          {/* Popular */}
          <div className={styles.right}>
            <h1>Popular Movies</h1>
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
      )}
    </div>
  );
}

export default Home;