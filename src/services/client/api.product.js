import axios from "../axios.customize";

// FLASH SALE / HOME PRODUCTS
export const getHomeProductsAPI = () =>
  axios.get("/api/client/products", {
    params: {
      limit: 100,
      sort: "popular",
    },
  });

// PRODUCTS BY BRAND
export const getProductsByBrandAPI = (brandId, limit = 10) =>
  axios.get("/api/client/products", {
    params: {
      brandId,
      limit,
    },
  });
