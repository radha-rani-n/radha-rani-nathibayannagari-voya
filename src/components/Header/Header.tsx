import "./Header.scss";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="header__link">
        <h1 className="header__title">
          <span className="header__title-1">V</span>
          <span className="header__title-2">o</span>
          <span className="header__title-3">y</span>
          <span className="header__title-4">a</span>
        </h1>
      </Link>
      <Navigation />
    </div>
  );
};
export default Header;
