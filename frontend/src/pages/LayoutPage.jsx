import React from "react";
import { Header, Footer } from "../components";
import { Outlet, useNavigation } from "react-router-dom";

const LayoutPage = () => {
  const { state } = useNavigation();
  return (
    <>
      {state === "loading" ? (
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
