import { Link } from 'react-router';
import { Leaf, Facebook, MessageCircleHeart, Instagram, Mail, Phone, MapPin } from "lucide-react"
import logo from '../../public/HomeHero.webp'
import { FaXTwitter } from "react-icons/fa6";



const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <div className="bg-gray-100 text-white mt-20">
            <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <Link to='/'>
                            <div className="flex items-center gap-2 mb-4">
                                <img src={logo} alt="Logo" className="w-8 h-8 mr-1" />
                                <span className="text-2xl font-bold text-green-400">Home<span className='text-blue-500'>Hero</span></span>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm">
                            HomeHero is a modern web application that connects users with trusted local service
                            providers such as electricians, plumbers, and cleaners. Users can browse services, book
                            appointments, and leave ratings, while providers can manage their listings.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-blue-400 transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/plants" className="text-gray-400 hover:text-blue-400 transition">
                                    Plants
                                </Link>
                            </li>

                            <li>
                                <Link to="/auth/profile" className="text-gray-400 hover:text-blue-400 transition">
                                    My Profile
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-400">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="text-gray-400 hover:textblue-400 transition">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:textblue-400 transition">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:textblue-400 transition">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-400">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <Mail size={16} className="text-green-400" />
                                <a href="mailto:info@homehero.com" className="text-gray-400 hover:text-blue-400 transition">
                                    info@homehero.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={16} className="text-green-400" />
                                <a href="tel:+8801758197272" className="text-gray-400 hover:text-blue-400 transition">
                                    +8801758197272
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin size={16} className="text-green-400" />
                                <span className="text-gray-400">18 Street, Dhaka</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social Links */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex gap-4 mb-4 md:mb-0">
                        <Link
                            target='_blank'
                            to="https://www.facebook.com/"
                            className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition"
                        >
                            <Facebook size={18} />
                        </Link>
                        <Link
                            target='_blank'
                            to="https://x.com/"
                            className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition"
                        >
                            <FaXTwitter />
                        </Link>
                        <Link
                            target='_blank'
                            to="https://www.instagram.com/"
                            className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition"
                        >
                            <Instagram size={18} />
                        </Link>
                    </div>

                    <p className="text-gray-400 text-sm">&copy; {currentYear} HomeHero. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;