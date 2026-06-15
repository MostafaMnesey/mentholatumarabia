import api from "./api";

export const getHomeData = async () => {
  const response = await api.get("api/website/home");
  return response.data;
};

export const getBrands = async () => {
  const response = await api.get("api/website/brands");
  return response.data;
};

export const getDashboardBrands = async () => {
  const response = await api.get("api/dashboard/brands");
  return response.data;
};

export const getSingleBrand = async (brandId) => {
  const response = await api.get(`api/website/brands/${brandId}`);
  return response.data;
};

export const shopByBrand = async (brandId) => {
  const response = await api.get("api/website/shop", {
    params: { brandId },
  });
  return response.data;
};

export const getSingleProduct = async (productId) => {
  const response = await api.get(`api/website/products/${productId}`);
  return response.data;
};

export const getBlogs = async () => {
  const response = await api.get("api/website/blogs");
  return response.data;
};

export const getSingleBlog = async (blogId) => {
  const response = await api.get(`api/website/blogs/${blogId}`);
  return response.data;
};

export const contact = async (formBody) => {
  const response = await api.post("api/website/contact", formBody);
  return response.data;
};
