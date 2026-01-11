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
import MyBookings from "../Pages/MyBookings";
import MyServices from "../Pages/MyServices";
import ErrorPage from "../Pages/ErrorPage";
import MyProfile from "../Pages/MyProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout></Homelayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        element:<Home></Home>
      },
      {
        path:"/services",
        element:<Services></Services>,
        
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
        hydrateFallbackElement:<div className="flex justify-center items-center mt-12">
          <div className="loader border-t-4 border-teal-600 border-solid rounded-full w-12 h-12 animate-spin"></div>
        </div>
      },
      {
        path:'/my-bookings',
        element:<PrivateRoute>
          <MyBookings></MyBookings>
        </PrivateRoute>
      },
      {
        path:'/my-services',
        element:<PrivateRoute>
          <MyServices></MyServices>
        </PrivateRoute>
      },
      {
        path:'/my-profile',
        element:<PrivateRoute>
          <MyProfile></MyProfile>
        </PrivateRoute>,
      }
    ]
  },
  {
    path:'/auth',
    element:<AuthLayout></AuthLayout>,
    errorElement:<ErrorPage></ErrorPage>,
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