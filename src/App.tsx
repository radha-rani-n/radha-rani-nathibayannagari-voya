import "./App.scss";
import Header from "./components/Header/Header";
import PlanTrip from "./pages/PlanTrip/PlanTrip";
import YourTrips from "./pages/YourTrips/YourTrips";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/plan-trip" element={<PlanTrip />} />
          <Route path="/your-trips" element={<YourTrips />} />
        </Routes>
      </main>
      <footer>Footer</footer>
    </BrowserRouter>
  );
}

export default App;
