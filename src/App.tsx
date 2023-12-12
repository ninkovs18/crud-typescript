import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm2 ms-xl2">
            <Navigation />
          </div>
          <div className="ms-Grid-col ms-sm10 ms-xl10 main-element">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/link2" element={<h1>Link 2</h1>} />
              <Route path="/link3" element={<h1>Link 3</h1>} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
