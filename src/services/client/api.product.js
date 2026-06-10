import axios from "../axios.customize";

/* ─────────────────────────────────────────────
   HOME PRODUCTS
───────────────────────────────────────────── */

export const getHomeProductsAPI = async (params = {}) => {
  return axios.get("/api/users/products", {
    params: {
      limit: 100,
      sort: "popular",
      ...params,
    },
  });
};

/* ─────────────────────────────────────────────
   PRODUCTS BY BRAND
───────────────────────────────────────────── */

export const getProductsByBrandAPI = async (brandId, limit = 10) => {
  return axios.get("/api/users/products", {
    params: {
      brandId,
      limit,
    },
  });
};

/* ─────────────────────────────────────────────
   PRODUCT DETAIL
───────────────────────────────────────────── */

export const getProductDetailAPI = async (slug) => {
  return axios.get(`/api/users/products/${slug}`);
};

/* ─────────────────────────────────────────────
   RELATED PRODUCTS
───────────────────────────────────────────── */

export const getRelatedProductsAPI = async (slug) => {
  return axios.get(`/api/users/products/${slug}/related`);
};

/* ─────────────────────────────────────────────
   SEARCH PRODUCTS
───────────────────────────────────────────── */

export const searchProductsAPI = async (params = {}) => {
  return axios.get("/api/users/products/search", {
    params,
  });
};

/* ─────────────────────────────────────────────
   PRODUCT GROUPS
───────────────────────────────────────────── */

export const getProductGroupsAPI = async () => {
  return axios.get("/api/users/products/groups");
};

/* ─────────────────────────────────────────────
   PRODUCT GROUP DETAIL
───────────────────────────────────────────── */

export const getProductGroupDetailAPI = async (slug) => {
  return axios.get(`/api/users/products/groups/${slug}`);
};
