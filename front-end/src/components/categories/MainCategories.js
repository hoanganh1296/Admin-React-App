import React, { useState, useEffect } from "react";
import Spinner from "../Loading/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createCategory,
  deleteCategory,
  getListCategory,
  reset,
  updateCategory,
} from "../../features/category/categorySlice";
import "./category.css";

function MainCategories() {
  const { listCategory, isSuccess, isLoading, message, isError } = useSelector(
    (state) => state.category
  );
  const [category, setCategory] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [id, setId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListCategory());
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }
    if (isError) {
      toast.error(message);
    }
  }, [isSuccess, isError, message]);

  const handelCreateCategory = async (e) => {
    e.preventDefault();
    if (onEdit) {
      dispatch(updateCategory({ id, name: category }));
    } else {
      dispatch(createCategory({ name: category }));
    }
    dispatch(reset());
    setOnEdit(false);
    setCategory("");
  };

  const editCategory = async (id, name) => {
    setId(id);
    setCategory(name);
    setOnEdit(true);
  };

  const handelDeleteCategory = async (id) => {
    dispatch(deleteCategory(id));
    dispatch(reset());
  };

  return (
    <div className="categories">
      <form onSubmit={handelCreateCategory}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">{onEdit ? "Update" : "Create"}</button>
      </form>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="col">
          {listCategory?.map((category) => (
            <div className="row" key={category._id}>
              <p>{category.name}</p>
              <button onClick={() => editCategory(category._id, category.name)}>
                Edit
              </button>
              <button onClick={() => handelDeleteCategory(category._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainCategories;
