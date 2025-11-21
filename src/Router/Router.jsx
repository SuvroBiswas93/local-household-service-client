import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Homelayout from "../Layout/Homelayout";
import Home from "../Pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout></Homelayout>,
    children:[
      {
        index:true,
        element:<Home></Home>
      }
    ]
  },
]);