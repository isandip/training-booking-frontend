import React from "react";
import BookingButton from "./BookingButton";

const MyBookings = ({ bookings, userId, onBookingUpdate }) => {
  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b.trainingId} className="booking-card">
            <span>{b.trainingTitle}</span>
            <BookingButton
              training={{ id: b.trainingId, availableSeats: 1 }}
              userId={userId}
              isBooked={true}
              onBookingUpdate={onBookingUpdate}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
