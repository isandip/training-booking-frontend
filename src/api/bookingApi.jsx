import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const bookTraining = async (trainingId, userId) => {
  const res = await axios.post(`${BASE_URL}/bookings/${trainingId}/book`, { userId });
  return res.data;
};

export const cancelBooking = async (trainingId, userId) => {
  const res = await axios.post(`${BASE_URL}/bookings/${trainingId}/cancel`, { userId });
  return res.data;
};

export const getUserBookings = async (userId) => {
  const res = await axios.get(`${BASE_URL}/bookings/user/${userId}`);
  return res.data.bookings;
};
