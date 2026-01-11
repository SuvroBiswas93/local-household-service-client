import React, { use, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import logo from '../../public/HomeHero.webp';
import { motion } from "framer-motion";

const Navbar = () => {
    const { user, logOut } = use(AuthContext);
    const navigate = useNavigate(); // <-- Added for HomeHero navigation

    // Theme Toggling
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeToggle = (e) => {
        setTheme(e.target.checked ? "dark" : "light");
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("You Logged Out successfully");
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    return (
        <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50">
            <div className="w-11/12 mx-auto flex justify-between items-center">
                {/* Left section (Logo + Dropdown) */}
                <div className="flex items-center gap-1 shrink-0 ">
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
                                        isActive ? 'text-teal-500 font-semibold' : ''
                                    }>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/services"
                                    className={({ isActive }) =>
                                        isActive ? 'text-teal-500 font-semibold' : ''
                                    }>
                                    Service List
                                </NavLink>
                            </li>

                            {user && (
                                <>
                                    <li>
                                        <NavLink to="/add-service"
                                            className={({ isActive }) =>
                                                isActive ? 'text-teal-500 border-b-2 border-teal-600 pb-1' : ''
                                            }>
                                            Add Services
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/my-bookings"
                                            className={({ isActive }) =>
                                                isActive ? 'text-teal-500 border-b-2 border-teal-600 pb-1' : ''
                                            }>
                                            My Bookings
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/my-services"
                                            className={({ isActive }) =>
                                                isActive ? 'text-teal-500 border-b-2 border-teal-600 pb-1' : ''
                                            }>
                                            My Services
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/my-profile"
                                            className={({ isActive }) =>
                                                isActive ? 'text-teal-500 font-semibold' : ''
                                            }>
                                            My Profile
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Logo/HomeHero */}
                    <motion.div
                        className="flex items-center cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                        onClick={() => navigate("/")} // <-- Programmatic navigation
                    >
                        <img src={logo} alt="Logo" className="w-10 h-10 mr-1" />
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-900 to-teal-500 bg-clip-text text-transparent">
                            HomeHero
                        </span>
                    </motion.div>

                </div>

                {/* Center menu (Desktop only) */}
                <div className="hidden lg:flex">
                    <ul className="menu-horizontal flex gap-6 font-semibold px-1">
                        <li>
                            <NavLink to="/" end
                                className={({ isActive }) =>
                                    isActive ? 'text-teal-500 border-b-2 border-teal-600 pb-1' : ''
                                }>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/services"
                                className={({ isActive }) =>
                                    isActive ? 'text-teal-500 border-b-2 border-teal-600 pb-1' : ''
                                }>
                                Service List
                            </NavLink>
                        </li>

                        {user && (
                            <>
                                <li>
                                    <NavLink to="/add-service"
                                        className={({ isActive }) =>
                                            isActive ? 'text-teal-500 border-b-2 border-teal-600 pb-1' : ''
                                        }>
                                        Add Services
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/my-bookings"
                                        className={({ isActive }) =>
                                            isActive ? 'text-teal-500 border-b-2 border-teal-600 pb-1' : ''
                                        }>
                                        My Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/my-services"
                                        className={({ isActive }) =>
                                            isActive ? 'text-teal-500 border-b-2 border-teal-600 pb-1' : ''
                                        }>
                                        My Services
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/my-profile"
                                        className={({ isActive }) =>
                                            isActive ? 'text-teal-500 border-b-2 border-teal-600 pb-1' : ''
                                        }>
                                        My Profile
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Right side (Login/Register or User Avatar) */}
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="avatar cursor-pointer">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    src={user?.photoURL || 'https://img.daisyui.com/images/profile/demo/spiderperson@192.webp'}
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

                            <li className="text-center font-semibold text-gray-700 py-1">
                                {user?.email || 'User'}
                            </li>

                            <div className="divider my-1"></div>
                            <li className="flex justify-center items-center py-2">
                                <input
                                    type="checkbox"
                                    checked={theme === "dark"}
                                    onChange={handleThemeToggle}
                                    className="toggle p-1 toggle-success bg-gray-300 border-gray-400 checked:bg-indigo-600 checked:border-indigo-600 transition-all duration-300 scale-110"
                                />
                            </li>
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
                    <div className="flex justify-center items-center gap-2 shrink-0">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Link to="/auth/login" className="btn btn-sm lg:btn-md bg-green-600 text-white hover:bg-green-700">
                                Login
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Link to="/auth/register" className="btn btn-sm lg:btn-md bg-blue-400 text-white hover:bg-blue-500">
                                Register
                            </Link>
                        </motion.div>
                        <input
                            type="checkbox"
                            value="synthwave"
                            className="toggle theme-controller fixed -right-0.5 top-5 z-9999"
                            onChange={handleThemeToggle}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
