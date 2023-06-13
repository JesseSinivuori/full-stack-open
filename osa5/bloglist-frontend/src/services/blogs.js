import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getAll = async () => {
  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const res = await axios.post(baseUrl, newBlog, config);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};
