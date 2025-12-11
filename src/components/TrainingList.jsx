// src/components/TrainingList.jsx
import React from "react";
import TrainingCard from "./TrainingCard";
import "../App.css";

const TrainingList = ({ trainings, user, bookings, onBookingUpdate, onBooked }) => {
  const userId = user?.id;

  return (
    <div className="training-list-grid">
      {trainings.map((training) => (
        <TrainingCard
          key={training.id}
          training={training}
          userId={userId}
          onBooked={onBooked}
        />
      ))}
    </div>
  );
};

export default TrainingList;
