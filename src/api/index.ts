// src/api/userApi.ts
import axios from "axios";

export const getUserData = async (id: string) => {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
};
