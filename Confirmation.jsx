import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state; // get passed booking data

  if (!booking) {
    // If user accesses directly, redirect to home
    navigate("/");
    return null;
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-content">
        <h2>🎉 Booking Confirmed!</h2>
        <p>
          Name: {booking.name} <br />
          Mentor: {booking.mentor} <br />
          Service: {booking.service} <br />
          Date: {booking.date}
        </p>
        <button onClick={() => navigate("/")} className="back-button">
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
