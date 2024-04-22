import React from "react";
import { Header, Footer } from "../components";
import { Outlet } from "react-router-dom";

const LayoutPage = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutPage;
