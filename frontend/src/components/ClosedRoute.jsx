import React from "react";
import useUser from "../hooks/useUser";
import { useLocation, useNavigate } from "react-router-dom";

const ClosedRoute = ({ children }) => {
  const { isAuth } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuth) {
    const origin = location.state?.from?.pathname || "/";
    navigate(origin);
  }

  return children;
};

export default ClosedRoute;
