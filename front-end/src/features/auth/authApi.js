import { postDataApi, getDataApi } from "../../utils/fetchData";


//Login
const login = async (data) => {
  const res = await postDataApi("user/login", data);
  return res.data;
};


// Logout user
const logout = async () => {
  await getDataApi("user/logout");
};

const refreshToken = async () => {
  const res = await getDataApi("user/refresh_token");
  return res.data;
};


const userApi = { login, logout, refreshToken };

export default userApi;
