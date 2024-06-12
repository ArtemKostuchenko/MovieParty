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
  DirectorsEditPage,
  DirectorPage,
  VideoContentListPage,
  VideoContentAddPage,
  VideoContentEditPage,
  GenrePage,
  BestListPage,
  RoomPage,
  InvitePage,
  RoomJoinPage,
  SubscribePage,
  NotFoundPage,
  SelectionsViewPage,
  SelectionPage,
  RequestResetPassword,
} from "./pages";
import {
  AdminRoute,
  ClosedRoute,
  ProtectedRoute,
  SubscriptionRoute,
} from "./components";
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
        path: "password/reset",
        element: (
          <ClosedRoute>
            <RequestResetPassword />
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
        element: (
          <ProtectedRoute>
            <ProfileLayout />
          </ProtectedRoute>
        ),
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
            path: "subscription",
            element: <ProfileSubscribePage />,
          },
        ],
      },
      {
        path: "panel/admin",
        element: (
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        ),
        children: [
          {
            path: "video-content",
            element: <VideoContentListPage />,
          },
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
            path: "directors/:id/edit",
            element: <DirectorsEditPage />,
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
        element: (
          <ProtectedRoute>
            <ActorPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "director/:fullName",
        element: (
          <ProtectedRoute>
            <DirectorPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "video-content/add",
        element: (
          <ProtectedRoute>
            <VideoContentAddPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "video-content/:id/edit",
        element: (
          <ProtectedRoute>
            <VideoContentEditPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ":typeVideoContentName/genre/:originNameGenre",
        element: (
          <ProtectedRoute>
            <GenrePage />
          </ProtectedRoute>
        ),
      },
      {
        path: ":typeVideoContentName/best-list/:bestListName",
        element: (
          <ProtectedRoute>
            <BestListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "room/invite",
        element: (
          <ProtectedRoute>
            <InvitePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "room/join",
        element: (
          <ProtectedRoute>
            <RoomJoinPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "room/:id",
        element: (
          <ProtectedRoute>
            <RoomPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "subscribe",
        element: (
          <ProtectedRoute>
            <SubscribePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "selections",
        element: (
          <ProtectedRoute>
            <SelectionsViewPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "selections/:selectionId",
        element: (
          <ProtectedRoute>
            <SelectionPage />
          </ProtectedRoute>
        ),
      },
    ],
    errorElement: <NotFoundPage />,
  },
  {
    path: ":typeVideoContent/:originTitle/watch",
    element: (
      <ProtectedRoute>
        <SubscriptionRoute>
          <WatchVideoContentPage />
        </SubscriptionRoute>
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
