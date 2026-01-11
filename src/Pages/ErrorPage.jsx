import React from 'react';
import { Link, useRouteError } from 'react-router';
import errorPageImg from '../assets/errorPageImg.jpg'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ScrollToTopCTA from '../Components/ScrollToTopCTA';

const ErrorPage = () => {
    const error = useRouteError()
    return (
        <div>
            <>
                <Navbar></Navbar>
                {/* <div>{error.message}</div> */}
                <div className='flex flex-col justify-center items-center space-y-3 pt-20'>
                    <img src={errorPageImg} alt='Error Image' className='rounded-lg' />
                    <h1 className='text-3xl font-bold'>Oops, page not found!!</h1>
                    <p className="text-muted ">
                        {error?.statusText || error?.message || "The page you are looking for is not available."}
                    </p>
                    <Link to='/'

                        className="btn bg-teal-500 hover:bg-teal-600 text-white border-none"
                    >
                        Go Back !

                    </Link>

                </div>

                <Footer></Footer>
                <ScrollToTopCTA />

            </>
        </div>
    );
};

export default ErrorPage;