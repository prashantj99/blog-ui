import React, { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRouteWrapper({ isAuthenticated }) {
  return (isAuthenticated != null) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteWrapper;
