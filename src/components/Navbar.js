import { Link, useNavigate } from "react-router-dom";
import styles from "./cssModule/Navbar.module.css";
import { Group_obj, Group_key_arr } from "../atom/NavList";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const changeValue = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search/${search}`);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // ✅ 초기 화면 크기 기준으로 메뉴 상태 설정
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setMenuOpen(!isMobile);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.pageName}>
        <Link to="/">FlickFacts</Link>
      </div>

      <div className={styles.hamburger} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <div className={`${styles.groupLinks} ${menuOpen ? styles.active : ""}`}>
        {Group_key_arr.map((key) => (
          <div className={styles.link} key={key}>
            <Link to={`/page/${Group_obj[key]}/1`} onClick={() => setMenuOpen(false)}>
              {key}
            </Link>
          </div>
        ))}
        {/* 🎄 크리스마스 메뉴 */}
        <div className={styles.christmas}>
          <Link to="/page/holiday/1" onClick={() => setMenuOpen(false)}>
            <span>🎄</span><span>C</span><span>h</span><span>r</span><span>i</span><span>s</span><span>t</span><span>m</span><span>a</span><span>s</span><span>🎄</span>
          </Link>
        </div>
      </div>

      <div className={styles.searchInput}>
        <input
          type="text"
          placeholder="Search Movie!"
          value={search}
          onChange={changeValue}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;