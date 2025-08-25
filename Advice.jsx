import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AbroadStudies.css";

const Advice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const advice = location.state?.advice || "No advice found.";

  return (
    <div className="form-container">
      <h2>Your Personalized Career Advice</h2>
      <div className="advice-box">
        <pre style={{ whiteSpace: "pre-wrap" }}>{advice}</pre>
      </div>
      <button style={{ marginTop:"20px" }} onClick={()=>navigate("/")}>Back to Form</button>
    </div>
  );
};

export default Advice;
