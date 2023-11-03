import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../components/cssModule/Group.module.css"
import Load from "../components/Load.js"
import MoviesGroup from "../components/MoviesGroup.js"

const pageArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Group() {
  const { page, group } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState(true);

  const getMovies = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/list_movies.json?page=${page}&${group}&sort_by=rating`)
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  }

  useEffect(() => {
    getMovies();
  }, [group, page])

  return (
    <div className={styles.container}>
      {/* Show Movies */}
      {loading ? <Load /> : <div className={styles.gridContainer}>
        {movies.map((movies) => (
          <MoviesGroup
            key={movies.id}
            id={movies.id}
            coverImg={movies.medium_cover_image}
            title={movies.title}
            summary={movies.summary}
            genres={movies.genres}
            rate={movies.rating}
            year={movies.year}
          />
        ))}
      </div>}

      {/* Page Index */}
      {loading ? null : <div className={styles.footer}>
        <div className={styles.pages}>
          {pageArr.map((page) => (
            <div className={styles.pageNum}>
              <Link key={page} to={`/page/${group}/${page}`}>{`${page}`}</Link>
            </div>
          ))}
        </div>
      </div>}
    </div>
  )
}

export default Group;