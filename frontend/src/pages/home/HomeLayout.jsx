import React from "react";
import UnAuthenticatedPage from "./unauthenticated/UnAuthenticatedPage";
import useUser from "../../hooks/useUser";
import MainPage from "./main/MainPage";

const HomeLayout = () => {
  const { isAuth } = useUser();

  if (isAuth) {
    return <MainPage />;
  }

  return <UnAuthenticatedPage />;
};

export default HomeLayout;
