import axios from "./axios.customize";

export const fetchAllColorsAPI = (page, limit) =>
  axios.get("/api/admin/colors", {
    params: { page, limit },
  });

export const fetchColorByIdAPI = (id) => {
  if (!id) throw new Error("colorId is required");

  return axios.get(`/api/admin/colors/${id}`);
};

export const createColorAPI = (data) => axios.post("/api/admin/colors", data);

export const updateColorAPI = (colorId, data) => {
  if (!colorId) throw new Error("colorId is required");

  return axios.put(`/api/admin/colors/${colorId}`, data);
};

export const deleteColorAPI = (colorId) => {
  if (!colorId) throw new Error("colorId is required");

  return axios.delete(`/api/admin/colors/${colorId}`);
};
