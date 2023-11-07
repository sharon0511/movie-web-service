import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./cssModule/Search.module.css";
import Load from "./Load"
import MoviesGroup from "./MoviesGroup";

function Search() {
  const { search } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [movArr, setMovArr] = useState([]);

  const getMovies = () => {
    for (let i = 1; i <= 100; i++) {
      setLoading(true);
      setMovies([]);
      fetch(`https://yts.mx/api/v2/list_movies.json?page=${i}&sort_by=rating`)
        .then((res) => res.json())
        .then((json) => setMovies(json.data.movies))
    }
    setLoading(false);
  }

  const load = () => {
    <Load />
  }

  useEffect(() => {
    setLoading(true);
    setMovArr([]);
    getMovies();

    return;
  }, [search])

  {/* Search Function */ }
  useEffect(() => {
    if (movies.length === 0) {
      load();
    } else {
      setMovArr(
        (
          [movArr,
            ...[movies.filter((movie) => (movie.summary.toLowerCase().indexOf(search.toLowerCase()) !== -1
              || movie.description_full.toLowerCase().indexOf(search.toLowerCase()) !== -1
              || movie.title.toLowerCase().indexOf(search.toLowerCase()) !== -1))]
          ]
        )
          .flat()
          .map((movie, i, arr) => {
            for (let j = i + 1; j < arr.length; j++) {
              if ((movie.id === arr[j].id) && arr[j] !== undefined && movie !== undefined) {
                console.log(i, j);
                console.log(movie.id, arr[j].id);
                arr.splice(j, 1);
                j -= 1;
              }
            }
            return movie;
          })
          .sort((a, b) => b['rating'] - a['rating'])
      )
    }
  }, [movies])

  return (
    <div className={(search.toLowerCase() === "christmas") ? styles.christmasContainer : styles.container}>
      {
        (loading) ? <Load /> :
          <div className={styles.gridContainer}>
            {
              movArr.map((movie) => (
                <MoviesGroup
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  coverImg={movie.medium_cover_image}
                  rating={movie.rating}
                  runtime={movie.runtime}
                  summary={movie.summary}
                  year={movie.year}
                  santa={search}
                />
              ))
            }
          </div>
      }
    </div>
  )
}

export default Search;