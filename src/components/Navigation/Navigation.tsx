import "./Navigation.scss";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <>
      <nav className="nav-bar">
        <ul className="nav-bar__list">
          <Link to="/your-trips">
            <li className="nav-bar__item">Your Trips</li>
          </Link>
          <Link to="/">
            <li className="nav-bar__item">Home</li>
          </Link>
        </ul>
      </nav>
    </>
  );
};
export default Navigation;
