import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div>Layout</div>
      <Outlet></Outlet>
    </>
  );
};

export default AdminLayout;
