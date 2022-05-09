import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryApi from "./categoryApi";

const initialState = {
  listCategory: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//get list products
export const getListCategory = createAsyncThunk(
  "category/getCategory",
  async (_, thunkAPI) => {
    try {
      return await categoryApi.getListCategory();
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await categoryApi.createCategory(data, token);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await categoryApi.deleteCategory(id, token);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (data , thunkAPI) => {
    try {
      const { id, ...fields } = data;
      const token = thunkAPI.getState().auth.token;
      return await categoryApi.updateCategory(id, fields, token);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListCategory.fulfilled, (state, action) => {
        state.listCategory = action.payload;
        state.isLoading = false;
      })
      .addCase(getListCategory.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        // state.listCategory.push(action.payload);
        state.message = action.payload.msg;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.msg;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.msg;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = categorySlice.actions;

export default categorySlice.reducer;
