import "./app.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/user/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/product/NewProduct";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshToken } from "./features/auth/authSlice";
import Category from "./pages/category/Category";

function App() {
  const dispatch = useDispatch();
  const firstLogin = localStorage.getItem("firstLogin");
  useEffect(() => {
    if (firstLogin) {
      setTimeout(() => {
        dispatch(refreshToken());
      }, 10 * 60 * 1000);
        dispatch(refreshToken())
    }
  }, [firstLogin, dispatch]);

  return (
    <Router>
      <ToastContainer autoClose={2500} hideProgressBar={true} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRouter />}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />

          <Route path="/user/:userId" element={<User />} />

          <Route path="/newUser" element={<NewUser />} />

          <Route path="/products" element={<ProductList />} />

          <Route path="/product/:productId" element={<NewProduct />} />

          <Route path="/newproduct" element={<NewProduct />} />

          <Route path="/category" element={<Category />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
