import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="welcome-title">🌾 WELCOME FARMERS! 🌾</h1>
      <p className="welcome-text">
        Empowering farmers with easy registration, land records, and insurance
        support. Join us today and grow with technology!
      </p>

      <div className="button-group">
        {/* Navigate to Farmer Registration */}
        <button className="btn primary" onClick={() => navigate("/register")}>
          Register
        </button>

        {/* Navigate to Login Form */}
        <button className="btn secondary" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;
