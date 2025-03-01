import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../component/login/login";
import Signup from "../component/signup/signup";
import Mainscreen from "../component/mainscreen/mainscreen";
import Travelform from "../component/mainscreen/travelform";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/requestform",
    element: <Travelform />,
  },
  {
    path: "/Dashboard",
    element: <Mainscreen />,
  }
]);

const Rout = () => {
  return <RouterProvider router={router} />;
};

export default Rout;
