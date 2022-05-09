import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/TopBar'
import MainUser from '../../components/users/user/MainUser'

function User() {
  return (
    <>
    <Topbar />
    <div className="container">
      <Sidebar />
      <MainUser/>
    </div>
  </>
  )
}

export default User