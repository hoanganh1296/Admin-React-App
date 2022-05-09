import { getDataApi } from "../../utils/fetchData";

//Get user order history
const getHistory = async (token) => {
  const res = await getDataApi("user/history", token);
  return res.data;
};

const historyApi = { getHistory };

export default historyApi;
