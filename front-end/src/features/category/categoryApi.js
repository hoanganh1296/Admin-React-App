import {
  deleteDataApi,
  getDataApi,
  postDataApi,
  putDataApi,
} from "../../utils/fetchData";

const getListCategory = async () => {
  const res = await getDataApi("category");
  return res.data;
};

const createCategory = async (data, token) => {
  const res = await postDataApi("category", data, token);
  return res.data;
};

const deleteCategory = async (id, token) => {
  const res = await deleteDataApi(`category/${id}`, token);
  return res.data;
};

const updateCategory = async (id, data, token) => {
  const res = await putDataApi(`category/${id}`, data, token);
  return res.data;
};

const categoryApi = {
  getListCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};

export default categoryApi;
