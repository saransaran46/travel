import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../component/login/login"; // Ensure correct path
import Signup from "../component/signup/signup"; // Ensure correct path
import Mainscreen from "../component/mainscreen/mainscreen"; // Ensure correct path
import Travelform from "../component/mainscreen/travelform"; // Ensure correct path
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
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
