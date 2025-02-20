import { useState, useEffect } from "react";
import "./Navigation.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PlanTripButton from "../PlanTripButton/PlanTripButton";
const Navigation = () => {
  const location = useLocation();
  const [yourTripsActive, setYourTripsActive] = useState(false);
  useEffect(() => {
    setYourTripsActive(location.pathname.includes("your-trips"));
  }, [location.pathname]);
  return (
    <>
      <nav className="nav-bar">
        <ul className="nav-bar__list">
          <Link to="/your-trips" className="nav-bar__item-link">
            <li
              className={`nav-bar__item ${
                yourTripsActive ? "nav-bar__item--active" : ""
              }`}
            >
              Your Trips
            </li>
          </Link>
          <Link to="/" className="nav-bar__item-link">
            <li
              className={`nav-bar__item ${
                !yourTripsActive ? "nav-bar__item--active" : ""
              }`}
            >
              Home
            </li>
          </Link>
          <div className="plan-trip-button">
            <PlanTripButton />
          </div>
        </ul>
      </nav>
    </>
  );
};
export default Navigation;
