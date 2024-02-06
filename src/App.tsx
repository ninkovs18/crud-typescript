import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import {Stack} from "@fluentui/react";
function App() {
  return (
    <BrowserRouter>
      <Stack>
        <Header />
      </Stack>
           <Stack horizontal>
           <Stack styles={{root: {width: "20vw"}}}>
           <Navigation />
           </Stack>
            <Stack styles={{root: {width: "80vw"}}}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/link2" element={<h1>Link 2</h1>} />
              <Route path="/link3" element={<h1>Link 3</h1>} />
            </Routes>
            </Stack>
           </Stack>
    </BrowserRouter>
  );
}

export default App;
