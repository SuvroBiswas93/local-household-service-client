import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import { ToastContainer } from 'react-toastify';
import ScrollToTopCTA from '../Components/ScrollToTopCTA';

const Homelayout = () => {
    return (
        <div className = "font-display">
            <div className='min-h-screen flex flex-col'>
            <nav className=''>
                <Navbar></Navbar>
            </nav>           
            <div className='flex-1 mt-15 '>
                <Outlet></Outlet>
            </div>
            <footer>
                <Footer></Footer>
            </footer>
            <ScrollToTopCTA />
            <ToastContainer />
        </div>
        </div>
    );
};

export default Homelayout;