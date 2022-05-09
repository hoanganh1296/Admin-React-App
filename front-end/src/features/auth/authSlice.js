import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "./authApi";

// Get user from localStorage

const initialState = {
  token: null,
  user: {},
  isLogged: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Login
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const res = await authApi.login(user);
    if (res.user.role !== 1) {
      return thunkAPI.rejectWithValue("You are not Admin");
    }
    if (res) {
      localStorage.setItem("firstLogin", "true");
    }
    return res;
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.msg;
    return thunkAPI.rejectWithValue(message);
  }
});

//Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authApi.logout();
  localStorage.removeItem("firstLogin");
});

//refresh token
export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (_, thunkAPI) => {
    try {
      return await authApi.refreshToken();
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isLogged = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLogged = true;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.token = null;
        state.isLogged = false;
        state.user = {};
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isLogged = false;
        state.isSuccess = false;
        state.user = {};
      })

      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLogged = true;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.token = null;
        state.isLogged = false;
        state.user = {};
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
