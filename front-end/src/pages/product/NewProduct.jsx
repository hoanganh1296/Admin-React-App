import React from 'react'
import MainNewProduct from '../../components/products/newProduct/MainNewProduct'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/TopBar'

function NewProduct() {
  return (
    <>
    <Topbar />
    <div className="container">
      <Sidebar />
      <MainNewProduct/>
    </div>
  </>
  )
}

export default NewProduct