import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
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
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {state === "loading" || isLoading ? (
        <div className="loader__fixed">
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
