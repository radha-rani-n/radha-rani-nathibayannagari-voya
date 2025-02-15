import "./HomePage.scss";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      {/* <Link to={"/search-result"}> */}
      <SearchBar />
      {/* </Link> */}
      <Link to="/plan-trip">
        <button>Plan a trip</button>
      </Link>
    </>
  );
};
export default HomePage;
