import React, { useState } from "react";
import { bookTraining } from "../api/bookingApi";
import "../App.css";

const TrainingCard = ({ training, userId, userBooking, onBookingUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState(userBooking ? userBooking.referenceNumber : null);

  const handleBooking = async () => {
    setLoading(true);
    try {
      const response = await bookTraining(training.id, userId);
      setReference(response.referenceNumber);
      onBookingUpdate();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const isBooked = !!userBooking;
  const noSeats = training.availableSeats <= 0;

  return (
    <div className="training-card">
      <div className="training-info">
        <h3>{training.title}</h3>
        <p>Seats Available: {training.availableSeats}</p>
        {isBooked && <p className="reference-number">Reference: {reference}</p>}
      </div>
      <button
        onClick={handleBooking}
        disabled={isBooked || noSeats || loading}
        className={isBooked ? "booked-btn" : ""}
      >
        {loading ? <span className="loader"></span> : isBooked ? "Booked" : "Book"}
      </button>
    </div>
  );
};

export default TrainingCard;
