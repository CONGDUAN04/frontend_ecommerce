import axios from "./axios.customize";
import { buildFormData } from "../utils/formData.js";
export const loginUserAPI = (email, password) =>
  axios.post("/api/login", {
    username: email,
    password,
  });

export const registerUserAPI = (data) => axios.post("/api/register", data);

export const logoutAPI = () => axios.post("/api/logout");

export const getAccountAPI = () => {
  const token = localStorage.getItem("access_token");
  return axios.get("/api/user/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProfileAPI = (data) =>
  axios.patch("/api/user/update-profile", buildFormData(data));

export const forgotPasswordAPI = (username) =>
  axios.post("/api/forgot-password", { username });

export const resetPasswordAPI = (username, newPassword) =>
  axios.post("/api/reset-password", {
    username,
    newPassword,
  });

export const verifyOtpAPI = (data) => {
  return axios.post("/api/verify-otp", data);
};

export const resendOtpAPI = (data) => {
  return axios.post("/api/resend-otp", data);
};
