import {
  deleteDataApi,
  getDataApi,
  postDataApi,
  putDataApi,
} from "../../utils/fetchData";

const getListProducts = async () => {
  const res = await getDataApi("products");
  return res.data;
};

const getEditProduct = async (id) => {
  const res = await getDataApi("products/" + id);
  return res.data;
};

const createProduct = async (data, token) => {
  const res = await postDataApi("products", data, token);
  return res.data;
};

const deleteProduct = async (id, token) => {
  const res = await deleteDataApi(`products/${id}`, token);
  return res.data;
};

const updateProduct = async (id, data, token) => {
  const res = await putDataApi(`products/${id}`, data, token);
  return res.data;
};

const productsApi = {
  getListProducts,
  getEditProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};

export default productsApi;
