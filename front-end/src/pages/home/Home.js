import React from "react";
import Main from "../../components/home/Main";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/TopBar";

function Home() {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Main/>
      </div>
    </>
  );
}

export default Home;
