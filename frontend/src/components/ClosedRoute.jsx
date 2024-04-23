import React, { useEffect } from "react";
import useUser from "../hooks/useUser";
import { useLocation, useNavigate } from "react-router-dom";

const ClosedRoute = ({ children }) => {
  const { isAuth } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuth) {
      const origin = location.state?.from?.pathname || "/";
      navigate(origin);
    }
  }, [navigate, isAuth]);

  return children;
};

export default ClosedRoute;
