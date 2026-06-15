import axios from "../axios.customize";

export const getCartAPI = () => {
  return axios.get("/api/users/cart");
};

export const addToCartAPI = ({ variantId, quantity = 1 }) => {
  return axios.post("/api/users/cart/items", {
    variantId,
    quantity,
  });
};

export const updateCartItemAPI = (itemId, quantity) => {
  return axios.patch(`/api/users/cart/items/${itemId}`, {
    quantity,
  });
};

export const removeCartItemAPI = (itemId) => {
  return axios.delete(`/api/users/cart/items/${itemId}`);
};

export const clearCartAPI = () => {
  return axios.delete("/api/users/cart");
};
