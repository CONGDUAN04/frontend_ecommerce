import axios from "./axios.customize";

export const fetchAllProductColorsAPI = (page, limit) =>
  axios.get("/api/admin/product-colors", {
    params: { page, limit },
  });

export const fetchProductColorByIdAPI = (id) => {
  if (!id) throw new Error("productColorId is required");

  return axios.get(`/api/admin/product-colors/${id}`);
};

export const createProductColorAPI = (data) =>
  axios.post("/api/admin/product-colors", data);

export const updateProductColorAPI = (id, data) => {
  if (!id) throw new Error("productColorId is required");

  return axios.put(`/api/admin/product-colors/${id}`, data);
};

export const deleteProductColorAPI = (id) => {
  if (!id) throw new Error("productColorId is required");

  return axios.delete(`/api/admin/product-colors/${id}`);
};
