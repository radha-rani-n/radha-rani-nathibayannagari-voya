import "./App.scss";
import Header from "./components/Header/Header";
import PlanTrip from "./pages/PlanTrip/PlanTrip";
import YourTrips from "./pages/YourTrips/YourTrips";
import HomePage from "./pages/HomePage/HomePage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import EditTrip from "./pages/EditTrip/EditTrip";
import PlaceProfile from "./pages/PlaceProfile/PlaceProfile";
import TripDetails from "./pages/TripDetails/TripDetails";
import Footer from "./components/Footer/Footer";
import AboutCreator from "./pages/AboutCreator/AboutCreator";
import { useEffect } from "react";
import { sample } from "lodash";
import { useSession } from "@clerk/clerk-react";
import { InteractiveComponent } from "./components/SignInPage/SignInPage";
function App() {
  const { isSignedIn, isLoaded } = useSession();
  useEffect(() => {
    const modules: {
      [key: string]: { name: string };
    } = import.meta.glob("/public/icons/*.svg");
    const fileNames = [];
    for (const key in modules) {
      const value = modules[key];
      fileNames.push(value.name.split("/").pop());
    }

    document.body.style.cursor = `url(${window.location.origin}/icons/${sample(
      fileNames
    )}) 16 16, pointer`;
  }, []);

  if (!isLoaded) {
    return;
  }

  if (!isSignedIn) {
    return <InteractiveComponent />;
  }

  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <main className="app-container__main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/plan-trip" element={<PlanTrip />} />
            <Route path="/your-trips" element={<YourTrips />} />
            <Route path="/trips/:id/edit" element={<EditTrip />} />
            <Route path="/places/:id" element={<PlaceProfile />} />
            <Route path="/trips/:id" element={<TripDetails />} />
            <Route path="/about-creator" element={<AboutCreator />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
