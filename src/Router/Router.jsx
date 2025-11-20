import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Homelayout from "../Layout/Homelayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout></Homelayout>
  },
]);