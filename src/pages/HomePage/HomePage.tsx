import "./HomePage.scss";

import travelGirl from "../../assets/illustrations/Traveling-bro.svg";
import TravelAnimation from "../../assets/illustrations/traveling-animate.svg";
import SearchBarAutoComplete from "../../components/SearchAuto/SearchAuto";

const HomePage = () => {
  return (
    <main className="home">
      <SearchBarAutoComplete />
      <img
        src={TravelAnimation}
        alt="Travel Illustration"
        className="home__illustration home__illustration--1"
      />
      <img
        src={travelGirl}
        alt="Travel Illustration"
        className="home__illustration home__illustration--2"
      />
    </main>
  );
};
export default HomePage;
