import "./HomePage.scss";
import SearchBar from "../PlaceProfile/PlaceProfile";
import SearchBarAutoComplete from "../../components/SearchAuto/SearchAuto";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      {/* <Link to={"/search-result"}> */}
      <SearchBar />
      <SearchBarAutoComplete />
      {/* </Link> */}

      <Link to="/plan-trip">
        <button>Plan a trip</button>
      </Link>
    </>
  );
};
export default HomePage;
