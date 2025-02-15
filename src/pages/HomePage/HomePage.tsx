import "./HomePage.scss";

import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <Link to={"/search-result"}>
        <h2>Search bar</h2>
      </Link>
      <Link to="/plan-trip">
        <button>Plan a trip</button>
      </Link>
    </>
  );
};
export default HomePage;
