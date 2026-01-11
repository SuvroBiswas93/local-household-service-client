import React, { useEffect, useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import logo from '../../public/HomeHero.webp';
import { motion } from "framer-motion";
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    // Theme
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleLogout = () => {
        logOut()
            .then(() => toast.success("You logged out successfully"))
            .catch(error => toast.error(error.message));
    };

    // ✅ Active NavLink style (RESTORED)
    const navLinkClass = ({ isActive }) =>
        isActive
            ? "text-teal-500 font-bold border-b-2 border-teal-500"
            : "hover:text-teal-600 transition";

    return (
        <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50">
            <div className="w-11/12 mx-auto flex justify-between items-center">

                {/* Left */}
                <div className="flex items-center gap-1">

                    {/* Mobile Menu */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            ☰
                        </div>
                        <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow mt-3 w-44 p-2 z-50">
                            <li><NavLink to="/" end className={navLinkClass}>Home</NavLink></li>
                            <li><NavLink to="/services" className={navLinkClass}>Service List</NavLink></li>

                            {user && (
                                <>
                                    <li><NavLink to="/add-service" className={navLinkClass}>Add Services</NavLink></li>
                                    <li><NavLink to="/my-bookings" className={navLinkClass}>My Bookings</NavLink></li>
                                    <li><NavLink to="/my-services" className={navLinkClass}>My Services</NavLink></li>
                                    <li><NavLink to="/my-profile" className={navLinkClass}>My Profile</NavLink></li>
                                </>
                            )}
                            <li><NavLink to="/faq" className={navLinkClass}>FAQ</NavLink></li>
                            <li><NavLink to="/contact" className={navLinkClass}>Contact Us</NavLink></li>

                        </ul>
                    </div>

                    {/* Logo */}
                    <motion.div
                        className="flex items-center cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/")}
                    >
                        <img src={logo} alt="Logo" className="w-10 h-10 mr-1" />
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-800 to-teal-500 bg-clip-text text-transparent">
                            HomeHero
                        </span>
                    </motion.div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex">
                    <ul className="menu-horizontal flex gap-6 font-semibold">
                        <li><NavLink to="/" end className={navLinkClass}>Home</NavLink></li>
                        <li><NavLink to="/services" className={navLinkClass}>Service List</NavLink></li>


                        {user && (
                            <>
                                <li><NavLink to="/add-service" className={navLinkClass}>Add Services</NavLink></li>
                                <li><NavLink to="/my-bookings" className={navLinkClass}>My Bookings</NavLink></li>
                                <li><NavLink to="/my-services" className={navLinkClass}>My Services</NavLink></li>
                                <li><NavLink to="/my-profile" className={navLinkClass}>My Profile</NavLink></li>
                            </>
                        )}
                        <li><NavLink to="/faq" className={navLinkClass}>FAQ</NavLink></li>
                        <li><NavLink to="/contact" className={navLinkClass}>Contact Us</NavLink></li>
                    </ul>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition"
                    >
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} className="avatar cursor-pointer">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={user?.photoURL} alt="User" />
                                </div>
                            </div>
                            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow mt-3 w-48 p-2">
                                <li className="text-center font-semibold">{user?.displayName}</li>
                                <li className="text-center text-sm">{user?.email}</li>
                                <div className="divider my-1"></div>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="btn bg-red-500 text-white w-full"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <motion.div
                            className="flex gap-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/auth/login" className="btn btn-sm bg-blue-800 text-white">
                                    Login
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/auth/register" className="btn btn-sm bg-teal-500 text-white">
                                    Register
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
