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
  ProfileCommentsPage,
  ProfileFavoritePage,
  ProfilePersonalPage,
  ProfilePasswordPage,
  ProfileSubscribePage,
  AdminLayout,
  CountriesPage,
  TypeContentPage,
  GenresPage,
  BestListsPage,
  PartsPage,
  SelectionsPage,
  ActorsPage,
  ActorsAddPage,
  ActorsEditPage,
  ActorPage,
  DirectorsPage,
  DirectorsAddPage,
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
          {
            path: "comments",
            element: <ProfileCommentsPage />,
          },
          {
            path: "favorite",
            element: <ProfileFavoritePage />,
          },
          {
            path: "personal-data",
            element: <ProfilePersonalPage />,
          },
          {
            path: "password",
            element: <ProfilePasswordPage />,
          },
          {
            path: "subscribe",
            element: <ProfileSubscribePage />,
          },
        ],
      },
      {
        path: "panel/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "type-content",
            element: <TypeContentPage />,
          },
          {
            path: "countries",
            element: <CountriesPage />,
          },
          {
            path: "genres",
            element: <GenresPage />,
          },
          {
            path: "best-lists",
            element: <BestListsPage />,
          },
          {
            path: "parts",
            element: <PartsPage />,
          },
          {
            path: "actors",
            element: <ActorsPage />,
          },
          {
            path: "actors/add",
            element: <ActorsAddPage />,
          },
          {
            path: "actors/:id/edit",
            element: <ActorsEditPage />,
          },
          {
            path: "directors",
            element: <DirectorsPage />,
          },
          {
            path: "directors/add",
            element: <DirectorsAddPage />,
          },
          {
            path: "selections",
            element: <SelectionsPage />,
          },
        ],
      },
      {
        path: "actor/:fullName",
        element: <ActorPage />,
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
