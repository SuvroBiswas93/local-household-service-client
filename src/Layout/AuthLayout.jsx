import React from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import ScrollToTopCTA from '../Components/ScrollToTopCTA';

const AuthLayout = () => {
    return (
        <div className='min-h-screen flex flex-col font-display'>
            <header >
                
                    <Navbar></Navbar>
                
            </header>
            <main className='w-11/12 mx-auto py-5 flex-1 mt-18'>
                <Outlet></Outlet>
            </main>
            <footer >
                <Footer></Footer>
            </footer>
            <ScrollToTopCTA />
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default AuthLayout;