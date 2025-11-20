import React, { use } from 'react';
import { Link, Navigate, NavLink } from 'react-router';
import { Leaf } from 'lucide-react';
import { AuthContext } from '../Provider/AuthProvider';
import { User } from 'lucide-react';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, logOut } = use(AuthContext)

    console.log(logOut)
    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("You Logged Out successfully");
            })
            .catch((error) => {
                toast.error(error);
            });
    }
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="w-11/12 mx-auto flex justify-between items-center">
                {/* Left section (Logo + Dropdown) */}
                <div className="flex items-center gap-2">
                    {/* Mobile dropdown */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow mt-3 w-40 p-2 z-100"
                        >
                            <li>
                                <NavLink to="/" end
                                    className={({ isActive }) =>
                                        isActive ? 'text-green-600 font-semibold' : ''
                                    }>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/plants"
                                    className={({ isActive }) =>
                                        isActive ? 'text-green-600 font-semibold' : ''
                                    }>
                                    Plants
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/auth/profile"
                                    className={({ isActive }) =>
                                        isActive ? 'text-green-600 font-semibold' : ''
                                    }>
                                    My Profile
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link to="/" className="text-green-600 flex items-center text-xl font-bold">
                        <Leaf className="mr-1" /> HomeHero
                    </Link>
                </div>

                {/* Center menu (Desktop only) */}
                <div className="hidden lg:flex">
                    <ul className="menu-horizontal flex gap-6 font-semibold px-1">
                        <li>
                            <NavLink to="/" end
                                className={({ isActive }) =>
                                    isActive ? 'text-green-600 border-b-2 border-green-600 pb-1' : ''
                                }>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/plants"
                                className={({ isActive }) =>
                                    isActive ? 'text-green-600 border-b-2 border-green-600 pb-1' : ''
                                }>
                                Plants
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/auth/profile"
                                className={({ isActive }) =>
                                    isActive ? 'text-green-600 border-b-2 border-green-600 pb-1' : ''
                                }>
                                My Profile
                            </NavLink>
                        </li>
                    </ul>
                </div>
                {/* div image thakbe state true false */}

                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="avatar cursor-pointer">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    src={
                                        user?.photoURL ||
                                        'https://img.daisyui.com/images/profile/demo/spiderperson@192.webp'
                                    }
                                    alt="User Avatar"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow-md mt-3 w-48 p-2 z-100"
                        >
                            <li className="text-center font-semibold text-gray-700 py-1">
                                {user?.displayName || 'User'}
                            </li>
                            <div className="divider my-1"></div>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="btn bg-red-400 text-white hover:bg-red-600 w-full"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link
                            to="/auth/login"
                            className="btn btn-sm lg:btn-md bg-green-600 text-white hover:bg-green-700"
                        >
                            Login
                        </Link>
                        <Link
                            to="/auth/register"
                            className="btn btn-sm lg:btn-md bg-green-600 text-white hover:bg-green-700"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;