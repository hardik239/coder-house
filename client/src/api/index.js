import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const sendOtp = (data) => api.post("/send-otp", data);
export const verifyOtp = (data) => api.post("/verify-otp", data);
export const activate = (data) => api.post("/activate", data);
export const signOut = () => api.post("/signout");
export const createRoom = (data) => api.post("/rooms", data);
export const getAllRooms = () => api.get("/rooms");
export const getRoom = (id) => api.get(`/rooms/${id}`);

// interceptors
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/refresh`, {
          withCredentials: true,
        });

        return api.request(originalRequest);
      } catch (err) {
        console.log(err.message);
      }
    }
    throw error;
  }
);

export default api;
