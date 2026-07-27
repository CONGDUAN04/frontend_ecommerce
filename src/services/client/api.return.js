import axios from "../axios.customize";

export const getReturnRequestsAPI = (params) => {
  return axios.get("/api/admin/returns", {
    params,
  });
};

export const getReturnRequestDetailAPI = (id) => {
  return axios.get(`/api/admin/returns/${id}`);
};

export const approveReturnAPI = (id, data) => {
  return axios.patch(`/api/admin/returns/${id}/approve`, data);
};

export const receiveReturnAPI = (id, data) => {
  return axios.patch(`/api/admin/returns/${id}/receive`, data);
};

export const rejectReturnAPI = (id, data) => {
  return axios.patch(`/api/admin/returns/${id}/reject`, data);
};

export const completeReturnAPI = (id, data) => {
  return axios.patch(`/api/admin/returns/${id}/complete`, data);
};

export const inspectingReturnAPI = (id, data) => {
  return axios.patch(`/api/admin/returns/${id}/inspecting`, data);
};
