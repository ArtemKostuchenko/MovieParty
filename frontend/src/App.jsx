import React, { Children } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LayoutPage,
  HomeLayout,
  LoginPage,
  RegisterPage,
  VideoContentPage,
  ProfileLayout,
  ProfilePage,
} from "./pages";
import { ClosedRoute, ProtectedRoute } from "./components";
import WatchVideoContentPage from "./pages/watch/WatchVideoContentPage";

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
            element: (
              <ProtectedRoute>
                <VideoContentPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          {
            element: <ProfilePage />,
            index: true,
          },
        ],
      },
    ],
  },
  {
    path: ":typeVideoContent/:originTitle/watch",
    element: (
      <ProtectedRoute>
        <WatchVideoContentPage />
      </ProtectedRoute>
    ),
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
