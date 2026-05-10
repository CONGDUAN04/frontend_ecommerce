import axios from "./axios.customize";

export const fetchAllVariantsAPI = () => axios.get("/api/admin/variants");

export const fetchVariantByIdAPI = (id) => {
  if (!id) throw new Error("variantId is required");

  return axios.get(`/api/admin/variants/${id}`);
};

export const createVariantAPI = (data) =>
  axios.post("/api/admin/variants", data);

export const updateVariantAPI = (id, data) => {
  if (!id) throw new Error("variantId is required");

  return axios.put(`/api/admin/variants/${id}`, data);
};

export const deleteVariantAPI = (id) => {
  if (!id) throw new Error("variantId is required");

  return axios.delete(`/api/admin/variants/${id}`);
};

export const updateVariantStatusAPI = (id, data) => {
  if (!id) throw new Error("variantId is required");

  return axios.patch(`/api/admin/variants/${id}/status`, data);
};
