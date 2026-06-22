import axios from "../axios.customize";

export const createOrderAPI = (data) => {
  return axios.post("/api/users/orders", data);
};

export const getOrdersAPI = () => {
  return axios.get("/api/users/orders");
};

export const getOrderDetailAPI = (id) => {
  return axios.get(`/api/users/orders/${id}`);
};

export const cancelOrderAPI = (id) => {
  return axios.patch(`/api/users/orders/${id}/cancel`);
};
