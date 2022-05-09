import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/TopBar'
import MainNewUser from '../../components/users/newUser/MainNewUser'

function NewUser() {
  return (
    <>
    <Topbar />
    <div className="container">
      <Sidebar />
      <MainNewUser/>
    </div>
  </>
  )
}

export default NewUser