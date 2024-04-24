import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LayoutPage,
  HomeLayout,
  LoginPage,
  RegisterPage,
  VideoContentPage,
} from "./pages";
import { ClosedRoute } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <HomeLayout />,
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
      {
        path: ":typeVideoContent",
        children: [
          {
            path: ":originTitle",
            element: <VideoContentPage />,
          },
        ],
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
