import "./App.css";
//import styled from "styled-components"
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
}

export default App;
