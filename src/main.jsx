import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router/dom";
import { router } from './Router/Router.jsx';
import Authprovider from './Provider/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Authprovider>
     <RouterProvider router={router} />,
   </Authprovider>
   <ToastContainer></ToastContainer>
  </StrictMode>,
)
