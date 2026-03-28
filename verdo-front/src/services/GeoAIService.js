import axios from "axios";
import AuthService from "./AuthService";
import { GEOAI_API_URL } from "./api";

const API_URL = `${GEOAI_API_URL}/`;

const getCurrentUserId = () => {
  const currentUser = AuthService.getCurrentUser();
  return currentUser?.user?._id || currentUser?.user?.id || null;
};

const getAuthHeaders = () => {
  const currentUser = AuthService.getCurrentUser();
  const token = currentUser?.token || currentUser?.data?.token;

  if (!token) {
    throw new Error("User not authenticated");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

class GeoAIService {
  async analyze(payload) {
    const requestBody = {
      ...payload,
      userId: getCurrentUserId(),
    };

    const config = {
      withCredentials: true,
    };

    try {
      config.headers = getAuthHeaders();
    } catch (error) {
      config.headers = {};
    }

    const response = await axios.post(`${API_URL}geoai/analyze`, requestBody, config);

    return response.data;
  }

  async getHistory() {
    const config = {
      params: {
        userId: getCurrentUserId(),
      },
      withCredentials: true,
    };

    try {
      config.headers = getAuthHeaders();
    } catch (error) {
      config.headers = {};
    }

    const response = await axios.get(`${API_URL}geoai/history`, config);

    return response.data;
  }
}

export default new GeoAIService();
