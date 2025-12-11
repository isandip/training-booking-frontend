import React, { useState } from "react";
import { cancelBooking } from "../api/bookingApi";

const CancelBookingModal = ({ userId, trainings, onCancelUpdate, onClose }) => {
  const [trainingName, setTrainingName] = useState("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    const training = trainings.find(t => t.title.toLowerCase() === trainingName.toLowerCase());
    if (!training) return alert("Training not found");

    setLoading(true);
    try {
      await cancelBooking(training.id, userId, reference);
      alert("Booking canceled successfully");
      onCancelUpdate(); // refresh bookings
      onClose(); // close modal
    } catch (err) {
      alert(err.response?.data?.message || "Cancellation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h2>Cancel Booking</h2>
        <input
          type="text"
          placeholder="Enter Training Name"
          value={trainingName}
          onChange={e => setTrainingName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Reference Number"
          value={reference}
          onChange={e => setReference(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={handleCancel} disabled={loading}>
            {loading ? "Cancelling..." : "Cancel Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;
