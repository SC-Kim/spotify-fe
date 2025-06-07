import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { User } from "../models/user";
import api from "../utils/api";

export const getCurrentUserProfile = async (): Promise<User> => {
  try {
    const response = await api.get(`/me`);
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch user profile.");
  }
};
