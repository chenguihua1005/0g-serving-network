// src/services/authService.ts
import { getUserData } from "@/api";

export const getUserProfile = async (id: string) => {
  return await getUserData(id);
};
