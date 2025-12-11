// src/components/TrainingCard.jsx
import React from "react";
import BookingButton from "./BookingButton";

const imageMap = {
  "React Basics":
    "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
  "Node.js Fundamentals":
    "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
  "Data Science":
    "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
  "UI/UX Design":
    "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg",
  "Business Strategy":
    "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
};

const getThumbnailForTraining = (training) => {
  if (imageMap[training.title]) return imageMap[training.title];

  const title = training.title.toLowerCase();
  if (title.includes("react") || title.includes("frontend")) {
    return imageMap["React Basics"];
  }
  if (title.includes("node") || title.includes("backend")) {
    return imageMap["Node.js Fundamentals"];
  }
  if (title.includes("data")) {
    return imageMap["Data Science"];
  }
  if (title.includes("design") || title.includes("ui") || title.includes("ux")) {
    return imageMap["UI/UX Design"];
  }
  if (title.includes("business")) {
    return imageMap["Business Strategy"];
  }

  return "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg";
};

const TrainingCard = ({ training, userId, onBooked }) => {
  const thumbnailUrl = getThumbnailForTraining(training);

  return (
    <div className="training-card course-card">
      <div className="course-card-left">
        <img
          src={thumbnailUrl}
          alt={training.title}
          className="course-thumb"
        />
      </div>

      <div className="course-card-right">
        <h3>{training.title}</h3>
        <p>Seats Available: {training.availableSeats}</p>
        <BookingButton training={training} userId={userId} onBooked={onBooked} />
      </div>
    </div>
  );
};

export default TrainingCard;
