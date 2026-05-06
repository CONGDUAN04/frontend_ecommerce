import axios from "./axios.customize";

// GET ALL
export const fetchAllProductsAPI = (page, limit) =>
  axios.get("/api/admin/products", {
    params: { page, limit },
  });

// CREATE
export const createProductAPI = (data) =>
  axios.post("/api/admin/products", data);

// UPDATE
export const updateProductAPI = (id, data) => {
  if (!id) throw new Error("productId is required");
  return axios.put(`/api/admin/products/${id}`, data);
};

// DELETE
export const deleteProductAPI = (id) => {
  if (!id) throw new Error("productId is required");
  return axios.delete(`/api/admin/products/${id}`);
};

// 🔥 NEW: UPDATE STATUS
export const updateProductStatusAPI = (id, data) => {
  if (!id) throw new Error("productId is required");

  return axios.patch(`/api/admin/products/${id}/status`, data);
};
