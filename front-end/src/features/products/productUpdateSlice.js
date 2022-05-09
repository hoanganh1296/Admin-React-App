import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "./productApi";

const initialState = {
  editProduct: {},
  isLoading: false,
  successUpdate: false,
  successFetch: false,
  isError: false,
  message: "",
};

export const getEditProduct = createAsyncThunk(
  "productUpdate/getEditProduct",
  async (id, thunkAPI) => {
    try {
      return await productsApi.getEditProduct(id);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//update product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productsApi.updateProduct(data._id, data, token);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productUpdate = createSlice({
  name: "productUpdate",
  initialState,
  reducers: {
    resetEdit: (state) => {
      state.isError = false;
      state.successUpdate = false;
      state.successFetch = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEditProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEditProduct.fulfilled, (state, action) => {
        state.editProduct = action.payload;
        state.successFetch = true;
        state.isLoading = false;
      })
      .addCase(getEditProduct.rejected, (state) => {
        state.isError = true;
        state.message = "";
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        // state.listCategory.push(action.payload);
        state.message = action.payload.msg;
        state.successUpdate = true;
        state.isLoading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetEdit } = productUpdate.actions;

export default productUpdate.reducer;
