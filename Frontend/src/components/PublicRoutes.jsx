import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  return isAuthenticated ? <Navigate to={`/`} /> : <Outlet />;
};

export default PublicRoutes;
