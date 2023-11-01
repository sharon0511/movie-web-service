import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"
import { Group_obj, Group_key_arr } from "../atom/NavList";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [search, setSearch] = useState();
  const changeValue = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div className={styles.container}>

      {/* Page Name */}
      <div className={styles.pageName}>
        <Link to={"/"}>Movies</Link>
      </div>

      {/* Group Links */}
      <div className={styles.groupLinks}>
        {
          Group_key_arr.map((key) => {
            return (
              <div className={styles.link} key={key}>
                <div className={styles.link_sep}>
                  <Link to={`/page/${Group_obj[key]}/1`}>{key}</Link>
                </div>
              </div>
            )
          })
        }
      </div>

      {/* Search */}
      <div className={styles.searchInput}>
        <div>
          <form>
            {/* Search Movie */}
            <input type="text" placeholder="Search Movie!" value={search} onChange={changeValue}></input>
            <button>
              <FontAwesomeIcon icon={faSearch} size="lg" color="white" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Navbar;