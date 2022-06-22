import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";
import "./Layout.scss";

const Layout = ({ children }) => {
  
  return (
    <div className="container-fluid layout-main">
      <Header />
      <Outlet/>
    </div>
  );
};

export default Layout;
