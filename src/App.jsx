import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FarmerForm from "./components/FarmerForm";
import LoginForm from "./components/LoginForm";
import LandForm from "./components/LandForm";
import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Farmer Registration */}
        <Route path="/register" element={<FarmerForm />} />

        {/* Login */}
        <Route path="/login" element={<LoginForm />} />

        {/* Land Registration (shown after login) */}
        <Route path="/land-registration" element={<LandForm />} />
      </Routes>
    </Router>
  );
}

export default App;
