import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useSubscription from "../hooks/useSubscription";
import Loader from "./Loader/Loader";

const SubscriptionRoute = ({ children }) => {
  const location = useLocation();
  const { subscription, isLoading } = useSubscription();
  if (isLoading) {
    return (
      <div className="loader__fixed">
        <div className="loader"></div>
      </div>
    );
  }

  if (!subscription?.plan?.active) {
    return <Navigate to="/subscribe" replace state={{ from: location }} />;
  }

  return children;
};

export default SubscriptionRoute;
