import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutPage, HomePage, LoginPage, RegisterPage } from "./pages";
import { loader as loginRegisterPageLoader } from "./pages/login/LoginPage";
import { ClosedRoute } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        loader: loginRegisterPageLoader,
        element: (
          <ClosedRoute>
            <LoginPage />
          </ClosedRoute>
        ),
      },
      {
        path: "register",
        loader: loginRegisterPageLoader,
        element: <RegisterPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
