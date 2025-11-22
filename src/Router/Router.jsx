import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Homelayout from "../Layout/Homelayout";
import Home from "../Pages/Home";
import Services from "../Pages/Services";
import Login from "../Pages/Login";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Pages/Register";
import AddService from "../Pages/AddService";
import PrivateRoute from "../Provider/PrivateRoute";
import ServiceDetails from "../Pages/ServiceDetails";

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
        loader:()=>fetch('https://local-household-service-server.vercel.app/services'),
        hydrateFallbackElement:<span className="loading flex justify-center items-center min-h-[85vh] mx-auto loading-spinner text-info"></span>
      },
      {
        path:'/add-service',
        element:<PrivateRoute>
          <AddService></AddService>
        </PrivateRoute>
      },
      {
        path :'/service-details/:id',
        element:<PrivateRoute>
          <ServiceDetails></ServiceDetails>
        </PrivateRoute>,
        loader:({params})=>fetch(`https://local-household-service-server.vercel.app/services/${params.id}`),
        hydrateFallbackElement:<span className="loading flex justify-center items-center min-h-[85vh] mx-auto loading-spinner text-info"></span>
      }
    ]
  },
  {
    path:'/auth',
    element:<AuthLayout></AuthLayout>,
    children:[
      {
        path:'/auth/login',
        element:<Login></Login>
      },
      {
        path:'/auth/register',
        element:<Register></Register>
      }
      

    ]
  },
]);