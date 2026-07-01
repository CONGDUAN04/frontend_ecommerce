import axios from "./axios.customize";

// List
export const fetchAllOrdersAPI = (params) =>
  axios.get("/api/admin/orders", {
    params,
  });

// Detail
export const fetchOrderByIdAPI = (id) => axios.get(`/api/admin/orders/${id}`);

// Actions
export const confirmOrderAPI = (id) =>
  axios.patch(`/api/admin/orders/${id}/confirm`);

export const shipOrderAPI = (id, data) =>
  axios.patch(`/api/admin/orders/${id}/ship`, data);

export const completeOrderAPI = (id) =>
  axios.patch(`/api/admin/orders/${id}/complete`);

export const cancelOrderAPI = (id, data) =>
  axios.patch(`/api/admin/orders/${id}/cancel`, data);

// Return
export const approveReturnAPI = (id, data) =>
  axios.patch(`/api/admin/orders/${id}/return/approve`, data);

export const rejectReturnAPI = (id, data) =>
  axios.patch(`/api/admin/orders/${id}/return/reject`, data);

export const completeReturnAPI = (id, data) =>
  axios.patch(`/api/admin/orders/${id}/return/complete`, data);
