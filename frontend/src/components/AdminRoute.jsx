import React from "react";
import useUser from "../hooks/useUser";
import { Navigate } from "react-router-dom";
import Loader from "./Loader/Loader";

const AdminRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Loader fixed />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default AdminRoute;
