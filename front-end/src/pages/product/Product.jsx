import React from 'react'
import MainProduct from '../../components/products/product/MainProduct'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/TopBar'

function Product() {
  return (
    <>
    <Topbar />
    <div className="container">
      <Sidebar />
      <MainProduct/>
    </div>
  </>
  )
}

export default Product