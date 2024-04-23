import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutPage, HomePage, LoginPage, RegisterPage } from "./pages";
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
        element: (
          <ClosedRoute>
            <LoginPage />
          </ClosedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ClosedRoute>
            <RegisterPage />
          </ClosedRoute>
        ),
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
