import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
// import { productsRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { deleteProduct, getListProducts } from "../../features/products/productSlice";

export default function ProductList() {
  // const [data, setData] = useState(productsRows);
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const { listProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getListProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.images.url}
              alt=""
            />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "countInStock",
      headerName: "Stock",
      width: 150,
    },

    {
      field: "price",
      headerName: "Price",
      sortable: true,
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="productList">
          <DataGrid
            rows={listProducts || {}}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            rowHeight={60}
            pagination
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>
    </>
  );
}
