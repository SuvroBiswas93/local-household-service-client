import React from 'react';
import { Link, useRouteError } from 'react-router';
import errorPageImg from '../assets/error-404.png'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const ErrorPage = () => {
    const error = useRouteError()
    return (
        <div>
            <>
                <Navbar></Navbar>
                {/* <div>{error.message}</div> */}
                <div className='flex flex-col justify-center items-center space-y-3 my-4'>
                    <img src={errorPageImg} alt='Error Image' />
                    <h1 className='text-3xl font-bold'>Oops, page not found!!</h1>
                    <p className="text-muted ">
                        {error?.statusText || error?.message || "The page you are looking for is not available."}
                    </p>
                    <Link to='/'

                        className="btn bg-green-500 hover:green-800 text-white border-none"
                    >
                        Go Back !

                    </Link>

                </div>

                <Footer></Footer>

            </>
        </div>
    );
};

export default ErrorPage;