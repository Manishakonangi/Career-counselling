import React from "react";
import { Link } from "react-router-dom";
import "../styles/welcome.css";

function Welcome() {
  return (
    <div className="welcome-page">
      <header className="top-bar">
        <div className="top-links">
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
            <Link to="/bookings">Bookings</Link>
                          <Link to="/about">About</Link>

        </div>
      </header>

      <div className="center-options">
        <h1>Welcome to Career Counselling</h1>
        <div className="option-buttons">
          <Link to="/abroad-studies" className="option">Abroad Studies</Link>
          <Link to="/colleges" className="option">Colleges</Link>
          <Link to="/placements" className="option">Placements</Link>
        </div>
      </div>
      
      <footer className="footer">
        <p>© 2025 Career Counselling Portal. All Rights Reserved.</p>
        <p>Contact: +91-9876543210 | info@careercounselling.com</p>
      </footer>
    </div>
  );
}

export default Welcome;
