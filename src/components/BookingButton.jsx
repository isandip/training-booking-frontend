// src/components/BookingButton.jsx
import React, { useState } from "react";
import { bookTraining } from "../api/bookingApi";

const BookingButton = ({ training, userId, onBooked }) => {
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    if (!userId) {
      alert("User not ready yet. Please refresh the page and try again.");
      return;
    }

    setLoading(true);
    try {
      const res = await bookTraining(training.id, userId);
      // res = { message, booking, remainingSeats, referenceNumber }
      if (onBooked) onBooked(res);
    } catch (err) {
      console.error("Booking error:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Error booking training");
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || training.availableSeats === 0;
  const label =
    training.availableSeats === 0 ? "Full" : loading ? "Booking..." : "Book";

  return (
    <button onClick={handleBook} disabled={disabled}>
      {loading ? <span className="loader"></span> : label}
    </button>
  );
};

export default BookingButton;
