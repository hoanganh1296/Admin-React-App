import "./newProduct.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCategory } from "../../../features/category/categorySlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Loading/Spinner";
import {
  createProduct,
  resetProduct,
} from "../../../features/products/productSlice";
import {
  getEditProduct,
  resetEdit,
  updateProduct,
} from "../../../features/products/productUpdateSlice";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  countInStock: 0,
  description: "Description...",
  category: "",
  _id: "",
};

export default function MainNewProduct() {
  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState(false);
  const [spinner, setSpinner] = useState(false);
  // const [file, setFile] = useState(null);
  // const [cat, setCat] = useState([]);\
  const [onEdit, setOnEdit] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.category.listCategory);
  const token = useSelector((state) => state.auth.token);
  const { listProducts, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.products
  );

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    isLoading: loadingUpdate,
    isError: errorUpdate,
    successFetch,
    successUpdate,
    editProduct,
    message: messageUpdate,
  } = productUpdate;

  useEffect(() => {
    dispatch(getListCategory());
  }, [dispatch]);

  useEffect(() => {
    if (params.productId) {
      setOnEdit(true);
      if (listProducts.length > 0) {
        listProducts.forEach((product) => {
          if (product._id === params.productId) {
            setProduct(product);
            setImages(product.images);
          }
        });
      } else {
        dispatch(getEditProduct(params.productId));
      }
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [params.productId, listProducts, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      setProduct({});
      setImages(false);
    }
    if (successFetch) {
      setProduct(editProduct);
      setImages(editProduct.images);
    }
    if (successUpdate) {
      toast.success(messageUpdate);
      dispatch(getEditProduct(product._id));
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(resetProduct());
    dispatch(resetEdit());
  }, [
    isSuccess,
    isError,
    message,
    dispatch,
    editProduct,
    navigate,
    successFetch,
    successUpdate,
    product.images,
    messageUpdate,
    product
  ]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) return toast.error("File not exist!");
      if (file.size > 1024 * 1024)
        // 1mb
        return toast.warning("Size too large!");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return toast.warning("File format is incorrect.");
      let formData = new FormData();
      formData.append("file", file);

      setSpinner(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setSpinner(false);
      setImages(res.data);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const handleDestroy = async (e) => {
    try {
      setSpinner(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setSpinner(false);
      setImages(false);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) return toast.warning("You're not an Admin'");
    if (!images) return toast.warning("NO Image upload");
    if (onEdit) {
      dispatch(updateProduct({ ...product, images }));
    } else {
      dispatch(createProduct({ ...product, images }));
    }
  };

  const styleImgUpload = {
    display: images ? "block" : "none",
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <div className="addProductContainer">
        <div className="uploadImg">
          <input type="file" id="file_up" name="file" onChange={handleUpload} />
          {spinner ? (
            <div
              className="fileImg"
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Spinner />
            </div>
          ) : (
            <div className="fileImg" style={styleImgUpload}>
              <img src={images ? images.url : ""} alt="Img upload" />
              <span onClick={handleDestroy}>X</span>
            </div>
          )}
        </div>

        <form className="addProductForm">
          <div className="addProductItem">
            <label>Product_ID</label>
            <input
              required
              name="product_id"
              type="text"
              value={product.product_id}
              onChange={handleChange}
              disabled={onEdit}
            />
          </div>
          <div className="addProductItem">
            <label>Title</label>
            <input
              required
              name="title"
              type="text"
              value={product.title}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input
              required
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Count In Stock</label>
            <input
              required
              name="countInStock"
              type="number"
              value={product.countInStock}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <textarea
              rows={4}
              name="description"
              type="text"
              value={product.description}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Categories:</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
            >
              <option value="">Please select a category</option>
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="addProductButton"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner style={{ width: "1rem", height: "1rem" }} />
            ) : onEdit ? (
              "Update"
            ) : (
              "Create"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
