import React, { useState } from "react";
import { bookTraining, cancelBooking } from "../api/bookingApi";

const BookingButton = ({ training, userId, isBooked, onBookingUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    setLoading(true);
    try {
      await bookTraining(training.id, userId);
      onBookingUpdate();
    } catch (err) {
      alert(err.response?.data?.message || "Error booking training");
    }
    setLoading(false);
  };

  const handleCancel = async () => {
    setLoading(true);
    try {
      await cancelBooking(training.id, userId);
      onBookingUpdate();
    } catch (err) {
      alert(err.response?.data?.message || "Error canceling booking");
    }
    setLoading(false);
  };

  return isBooked ? (
    <button onClick={handleCancel} disabled={loading}>
      {loading ? <span className="loader"></span> : "Cancel"}
    </button>
  ) : (
    <button onClick={handleBook} disabled={loading || training.availableSeats === 0}>
      {loading ? <span className="loader"></span> : training.availableSeats === 0 ? "Full" : "Book"}
    </button>
  );
};

export default BookingButton;
