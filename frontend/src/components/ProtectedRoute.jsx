import React, { useEffect } from "react";
import useUser from "../hooks/useUser";
import { setInviteCode } from "../features/store/slices/room";
import { Navigate, useLocation } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useUser();
  const dispatch = useDispatch();
  const location = useLocation();
  const query = useQuery();

  useEffect(() => {
    if (location.search && query.get("code")) {
      dispatch(setInviteCode(query.get("code")));
    }
  }, [location]);

  if (!isAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
