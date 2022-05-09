import React from "react";
import MainCategories from "../../components/categories/MainCategories";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/TopBar";

function Category() {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <MainCategories/>
      </div>
    </>
  );
}

export default Category;
