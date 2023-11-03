import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./routes/Home";
import Group from "./routes/Group";
import Detail from "./routes/Detail";
import Navbar from "./components/Navbar";
import styles from "./components/App.module.css"

function App() {
  return (
    <Router>
      <Navbar />
      <div className={styles.container}>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/page/:group/:page`} element={<Group />} />
          <Route path={`/movie/:id`} element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
