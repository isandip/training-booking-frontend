import React from "react";
import TrainingCard from "./TrainingCard";
import "../App.css";

const TrainingList = ({ trainings, userId, bookings, onBookingUpdate }) => {
  return (
    <div className="training-list-grid">
      {trainings.map((training) => {
        const userBooking = bookings.find(b => b.trainingId === training.id);
        return (
          <TrainingCard
            key={training.id}
            training={training}
            userId={userId}
            userBooking={userBooking}
            onBookingUpdate={onBookingUpdate}
          />
        );
      })}
    </div>
  );
};

export default TrainingList;
