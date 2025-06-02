import React from "react";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div>
      Sidebar
      <Outlet />
    </div>
  );
};

export default AppLayout;
