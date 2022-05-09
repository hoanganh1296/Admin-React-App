import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import historyApi from "./historyApi";

//Get order history
export const getHistory = createAsyncThunk("user/history", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await historyApi.getHistory(token);
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.msg;
    return thunkAPI.rejectWithValue(message);
  }
});

const OrderHistory = createSlice({
  name: "OrderHistory",
  initialState: {
    history: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.history = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
      });
  },
});

export default OrderHistory.reducer;
