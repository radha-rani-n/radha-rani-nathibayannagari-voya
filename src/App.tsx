import "./App.scss";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes></Routes>
      </main>
      <footer>Footer</footer>
    </BrowserRouter>
  );
}

export default App;
