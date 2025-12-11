import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getTrainings = async () => {
  const res = await axios.get(`${BASE_URL}/trainings`);
  return res.data;
};
