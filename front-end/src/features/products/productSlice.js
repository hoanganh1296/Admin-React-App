import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsApi from "./productApi";

const initialState = {
  listProducts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//get list products
export const getListProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      return await productsApi.getListProducts();
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//create a product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productsApi.createProduct(data, token);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//delete a product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productsApi.deleteProduct(id, token);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProduct: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListProducts.fulfilled, (state, action) => {
        state.listProducts = action.payload.products;
        state.isLoading = false;
      })
      .addCase(getListProducts.rejected, (state) => {
        state.isError = true;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        // state.listCategory.push(action.payload);
        state.message = action.payload.msg;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.message = action.payload.msg;
        state.listProducts = state.listProducts.filter(
          (p) => p._id !== action.meta.arg
        );
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetProduct } = productsSlice.actions;

export default productsSlice.reducer;
