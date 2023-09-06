import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  console.log(user);

  return isAuthenticated && user.role == "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
};

export default AdminRoutes;
