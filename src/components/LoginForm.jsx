import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const LoginForm = () => {
  const [farmerId, setFarmerId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const farmers = JSON.parse(localStorage.getItem("farmers")) || [];
    const user = farmers.find(
      (f) => f.registrationId === farmerId && f.password === password
    );

    if (user) {
      alert("Login successful!");
      navigate("/land-registration");
    } else {
      alert("Invalid Registration ID or password");
    }
  };

  return (
    <div className="login-container">
      <div className="section-container form-container">
        <h2>Farmer Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="regId">Registration ID:</label>
            <input
              type="text"
              id="regId"
              value={farmerId}
              onChange={(e) => setFarmerId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>

          <p className="register-text">
            Don't have an account?
            <a href="/register"> Register here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
