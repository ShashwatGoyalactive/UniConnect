import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";

const router = createBrowserRouter([
  {
    path: "api/user/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "register",
        element: <App />,
      },
      {
        path: "login",
        element: <App />,
      },
      {
        path: "logout",
        element: <App />,
      },
      {
        path: "get",
        element: <App />,
      },
      {
        path: "edittext",
        element: <App />,
      },
      {
        path: "editimage",
        element: <App />,
      },
      {
        path: "editpassword",
        element: <App />,
      },
    ],
  },
  {
    path: "api/team/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
    ],
  },
  {
    path: "api/event/",
    element: <Layout />,
    children: [
      {
        path: "create",
        element: <App />,
      },
      {
        path: "addTeam",
        element: <App />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
