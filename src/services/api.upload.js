import axios from "./axios.customize";
export const getUploadSignatureAPI = async (type) => {
  const res = await axios.post("/api/upload/signature", { type });
  return res;
};

export const deleteFileAPI = async (publicId) => {
  return axios.delete("/api/upload/file", {
    data: { publicId },
  });
};
