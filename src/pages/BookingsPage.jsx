import React, { useEffect, useState } from "react";
import MyBookings from "../components/MyBookings";
import { getUserBookings } from "../api/bookingApi";

const BookingsPage = ({ user }) => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    if (user) {
      const b = await getUserBookings(user.id);
      setBookings(b);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  return user ? (
    <MyBookings bookings={bookings} userId={user.id} onBookingUpdate={fetchBookings} />
  ) : (
    <p>Loading...</p>
  );
};

export default BookingsPage;
