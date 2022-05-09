import "./login.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
// import { getUserInfo } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isSuccess, user, isError, message, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    toast.warning("Welcome to Dashboard! Please login first.");
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login success!");
    }
    if (isError) {
      toast.error(message);
    }
    if (user && user.role === 1) {
      navigate("/", { replace: true });
    }
    dispatch(reset());
  }, [dispatch, user, navigate, isError, message, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  return (
    <>
      {isLoading && <Loading />}
      <div className="login-container">
        <form className="login-wrapper" onSubmit={handleSubmit}>
          <span className="login-title">Login</span>
          <div className="wrap-input">
            <span className="label-input">email</span>
            <input
              type="text"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="focus-input"></span>
          </div>
          <div className="wrap-input">
            <span className="label-input">Password</span>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="focus-input"></span>
          </div>
          <div className="wrap-login-btn">
            <div className="login-bgbtn"></div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
