import axios from "../axios.customize";

export const createOrderAPI = (data) => {
  return axios.post("/api/users/orders", data);
};

export const getOrdersAPI = (page = 1, limit = 10, status) => {
  return axios.get("/api/users/orders", {
    params: {
      page,
      limit,
      status,
    },
  });
};

export const getOrderDetailAPI = (id) => {
  return axios.get(`/api/users/orders/${id}`);
};

export const cancelOrderAPI = (id, cancelReason) => {
  return axios.patch(`/api/users/orders/${id}/cancel`, {
    cancelReason,
  });
};

export const reorderOrderAPI = (id) => {
  return axios.post(`/api/users/orders/${id}/reorder`);
};

export const returnOrderAPI = (id, data) => {
  return axios.post(`/api/users/orders/${id}/return`, data);
};

export const getReturnRequestAPI = (id) => {
  return axios.get(`/api/users/orders/${id}/return`);
};
