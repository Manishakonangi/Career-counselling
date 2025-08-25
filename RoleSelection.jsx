import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RoleSelection.css";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="role-selection">
      <h1>Welcome to Career Counseling Platform</h1>
      <h2>Select Your Option</h2>
      <div className="role-buttons">
        <button className="role-btn" onClick={() => navigate("/abroad-studies")}>Abroad Studies</button>
        <button className="role-btn" onClick={() => navigate("/colleges")}>Colleges</button>
        <button className="role-btn" onClick={() => navigate("/placements")}>Placements</button>
      </div>
    </div>
  );
};

export default RoleSelection;
