import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const createUser = async (name) => {
  const res = await axios.post(`${BASE_URL}/users`, { name });
  return res.data.user;
};
