import React, { useState } from "react";
import "../styles.css";

function FarmerForm() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    aadhaar: "",
    wallet: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [registrationId, setRegistrationId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit Indian mobile number";
    }

    if (!/^\d{12}$/.test(formData.aadhaar)) {
      newErrors.aadhaar = "Aadhaar must be exactly 12 digits";
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const uniqueId = "FRM-" + Date.now();
    setRegistrationId(uniqueId);

    const farmers = JSON.parse(localStorage.getItem("farmers")) || [];
    farmers.push({ ...formData, registrationId: uniqueId });
    localStorage.setItem("farmers", JSON.stringify(farmers));

    setFormData({
      name: "",
      mobile: "",
      aadhaar: "",
      wallet: "",
      password: "",
    });
  };

  return (
    <div className="section-container">
      <h2>FARMER REGISTRATION</h2>
      {!registrationId ? (
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Mobile Number (+91):</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10-digit number"
            />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </div>

          <div className="form-group">
            <label>Aadhaar Number:</label>
            <input
              type="text"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              placeholder="12-digit Aadhaar"
            />
            {errors.aadhaar && <span className="error">{errors.aadhaar}</span>}
          </div>

          <div className="form-group">
            <label>Wallet Address:</label>
            <input
              type="text"
              name="wallet"
              value={formData.wallet}
              onChange={handleChange}
              placeholder="Enter wallet address or connect wallet"
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="btn">
            Register
          </button>
        </form>
      ) : (
        <div className="success">
          <h3>Registration Successful 🎉</h3>
          <p>
            Your Registration Number: <strong>{registrationId}</strong>
          </p>
          <p>
            You can now <strong>login using this Registration ID and password</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

export default FarmerForm;
