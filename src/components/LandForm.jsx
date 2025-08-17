import React, { useState } from "react";

const southIndianStates = ["Karnataka", "Kerala", "Tamil Nadu", "Andhra Pradesh"];
const cropTypes = ["Rice", "Wheat", "Maize"];

const LandForm = () => {
  const [lands, setLands] = useState([]);
  const [formData, setFormData] = useState({
    landLocation: "",
    landSize: "",
    cropType: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateLandID = () => {
    // Simple unique code based on timestamp + random number
    return "LAND-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLand = {
      ...formData,
      landID: generateLandID(),
    };

    setLands([...lands, newLand]);
    setSuccessMessage(`Land registered successfully! Your Land ID is ${newLand.landID}`);
    
    // Reset form for next land entry
    setFormData({
      landLocation: "",
      landSize: "",
      cropType: "",
    });
  };

  return (
    <div className="land-form-container">
      <h2>Farmer Land Registration</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Land Location:
          <select
            name="landLocation"
            value={formData.landLocation}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            {southIndianStates.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </label>

        <label>
          Land Size (in acres):
          <input
            type="number"
            name="landSize"
            step="0.01"
            value={formData.landSize}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Crop Type:
          <select
            name="cropType"
            value={formData.cropType}
            onChange={handleChange}
            required
          >
            <option value="">Select Crop</option>
            {cropTypes.map((crop) => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </label>

        <button type="submit">Register Land</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}

      {lands.length > 0 && (
        <div className="registered-lands">
          <h3>Registered Lands:</h3>
          <ul>
            {lands.map((land) => (
              <li key={land.landID}>
                {land.landID} - {land.landLocation}, {land.landSize} acres, {land.cropType}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LandForm;
