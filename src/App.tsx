import "./App.scss";
import Header from "./components/Header/Header";
import PlanTrip from "./pages/PlanTrip/PlanTrip";
import YourTrips from "./pages/YourTrips/YourTrips";
import HomePage from "./pages/HomePage/HomePage";
// import SearchResult from "./pages/SearchResult/SearchResult";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import EditTrip from "./pages/EditTrip/EditTrip";
import PlaceProfile from "./pages/PlaceProfile/PlaceProfile";
import TripDetails from "./pages/TripDetails/TripDetails";
import Footer from "./components/Footer/Footer";
import AboutCreator from "./pages/AboutCreator/AboutCreator";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plan-trip" element={<PlanTrip />} />
          <Route path="/your-trips" element={<YourTrips />} />
          {/* <Route path="/search-result" element={<SearchResult />} /> */}
          <Route path="/trips/:id/edit" element={<EditTrip />} />
          <Route path="/places/:id" element={<PlaceProfile />} />
          <Route path="/trips/:id" element={<TripDetails />} />
          <Route path="/about-creator" element={<AboutCreator />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
