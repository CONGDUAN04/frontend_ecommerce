import axios from "./axios.customize";

export const fetchAllProductGroupsAPI = (page, limit) =>
  axios.get("/api/admin/product-groups", {
    params: { page, limit },
  });

export const createProductGroupAPI = (data) =>
  axios.post("/api/admin/product-groups", data);

export const updateProductGroupAPI = (productGroupId, data) => {
  if (!productGroupId) {
    throw new Error("productGroupId is required");
  }

  return axios.put(`/api/admin/product-groups/${productGroupId}`, data);
};

export const deleteProductGroupAPI = (productGroupId) => {
  if (!productGroupId) {
    throw new Error("productGroupId is required");
  }

  return axios.delete(`/api/admin/product-groups/${productGroupId}`);
};

export const updateProductGroupStatusAPI = (productGroupId, data) => {
  if (!productGroupId) {
    throw new Error("productGroupId is required");
  }

  return axios.patch(
    `/api/admin/product-groups/${productGroupId}/status`,
    data,
  );
};
