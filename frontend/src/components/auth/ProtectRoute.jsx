import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute = ({ children, user, redirect = "/login" }) => {
  return user ? (children ? children : <Outlet />) : <Navigate to={redirect} />;
};

export default ProtectRoute;
