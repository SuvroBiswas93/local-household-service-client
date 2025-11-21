import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Homelayout from "../Layout/Homelayout";
import Home from "../Pages/Home";
import Services from "../Pages/Services";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout></Homelayout>,
    children:[
      {
        index:true,
        element:<Home></Home>
      },
      {
        path:"/services",
        element:<Services></Services>,
        loader:()=>fetch('http://localhost:3000/services'),
        hydrateFallbackElement:<p>Loading....</p>
      }
    ]
  },
]);