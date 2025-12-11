// src/api/userApi.jsx
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const createUser = async (name, email) => {
  const res = await axios.post(`${BASE_URL}/users`, { name, email });
  return res.data.user;
};
