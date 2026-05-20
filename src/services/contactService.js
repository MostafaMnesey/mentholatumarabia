import api from "./api";

export const contact = async (formBody) => {
  const response = await api.post("api/website/contact", formBody);
  return response.data;
};
