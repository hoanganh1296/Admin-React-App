import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productSlice";
import categoryReducer from "../features/category/categorySlice";
import productUpdateReducer from "../features/products/productUpdateSlice";

const firstLogin = localStorage.getItem("firstLogin", "true");

const preloadedState = {
  auth: {
    isLogged: firstLogin ? true : false,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    category: categoryReducer,
    productUpdate: productUpdateReducer,
  },
  preloadedState,
});

export default store;
