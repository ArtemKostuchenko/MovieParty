import React, { useEffect } from "react";
import { Header, Footer } from "../components";
import { Outlet, useNavigation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authUser } from "../features/store/slices/user";
import useUser from "../hooks/useUser";

const LayoutPage = () => {
  const { state } = useNavigation();
  const dispatch = useDispatch();
  const { isLoading } = useUser();

  useEffect(() => {
    dispatch(authUser());
  }, []);

  return (
    <>
      {state === "loading" || isLoading ? (
        <div className="flex center">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default LayoutPage;
