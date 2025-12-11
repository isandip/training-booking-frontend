import React, { useEffect, useState, useCallback } from "react";
import TrainingList from "../components/TrainingList";
import CancelBookingModal from "../components/CancelBookingModal";
import { getTrainings } from "../api/trainingApi";
import { getUserBookings } from "../api/bookingApi";
import { createUser } from "../api/userApi";
import '../App.css';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [trainings, setTrainings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showTrainings, setShowTrainings] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Create a dynamic user on load
  useEffect(() => {
    const initUser = async () => {
      const newUser = await createUser("Alice"); // dynamic or input-based
      setUser(newUser);
    };
    initUser();
  }, []);

  // Fetch trainings and bookings
  const fetchData = useCallback(async () => {
    try {
      const t = await getTrainings();
      setTrainings(t);

      if (user) {
        const b = await getUserBookings(user.id);
        setBookings(b);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [user]);

  // Call fetchData whenever user is set and trainings are shown
  useEffect(() => {
    if (user && showTrainings) fetchData();
  }, [user, showTrainings, fetchData]);

  return user ? (
    <div className="App">
      {!showTrainings ? (
        <div className="welcome-card fade-in">
          <h1>Welcome, {user.name}!</h1>
          <button onClick={() => setShowTrainings(true)}>
            Click Here to Book Training / Lab
          </button>
        </div>
      ) : (
        <>
          {/* Cancel Booking Button */}
          <button
            className="cancel-btn"
            onClick={() => setShowCancelModal(true)}
          >
            Cancel Booking
          </button>

          {/* Training List */}
          <TrainingList
            trainings={trainings}
            userId={user.id}
            bookings={bookings}
            onBookingUpdate={fetchData}
          />

          {/* Cancel Booking Modal */}
          {showCancelModal && (
            <CancelBookingModal
              userId={user.id}
              trainings={trainings}
              onCancelUpdate={fetchData}
              onClose={() => setShowCancelModal(false)}
            />
          )}
        </>
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default HomePage;
