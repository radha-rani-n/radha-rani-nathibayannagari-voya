import "./Header.scss";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="header__link">
        <h1 className="header__title">Voya</h1>
      </Link>
      <Navigation />
    </div>
  );
};
export default Header;
