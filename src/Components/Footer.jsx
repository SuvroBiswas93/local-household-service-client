import { Link, useNavigate } from 'react-router';
import { Leaf, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import logo from '../../public/HomeHero.webp';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate(); // Added for programmatic navigation

  // Framer Motion props for social links
  const motionProps = {
    whileHover: { scale: 1.15 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 150, damping: 10 },
  };

  return (
    <div className="dark:bg-black text-gray-900 dark:text-white mt-20 py-10">
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            {/* Changed from MotionLink to motion.div + navigate */}
            <motion.div
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              onClick={() => navigate("/")} // programmatic navigation
            >
              <img src={logo} alt="Logo" className="w-10 h-10 mr-1" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-900 to-teal-500 bg-clip-text text-transparent">
                HomeHero
              </span>
            </motion.div>

            <p className="text-gray-400 text-sm mt-2">
              HomeHero is a modern web application that connects users with trusted local service
              providers such as electricians, plumbers, and cleaners. Users can browse services, book
              appointments, and leave ratings, while providers can manage their listings.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-600">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", to: "/" },
                { name: "Service List", to: "/services" },
                { name: "Add Services", to: "/add-service" },
                { name: "My Bookings", to: "/my-bookings" },
                { name: "My Services", to: "/my-services" },
                { name: "My Profile", to: "/my-profile" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-teal-400 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}

          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-600">
              Support
            </h3>

            <ul className="space-y-2 text-sm">
              {[
                { name: "FAQ", to: "/faq" },
                { name: "Contact Us", to: "/contact" },
                { name: "Privacy Policy", to: "/privacy-policy" },
                
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-teal-400 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-600">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-teal-400" />
                <a href="mailto:info@homehero.com" className="text-gray-400 hover:text-teal-400 transition">
                  info@homehero.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-teal-400" />
                <a href="tel:+8801758197272" className="text-gray-400 hover:text-teal-400 transition">
                  +8801758197272
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-teal-400" />
                <span className="text-gray-400">18 Street, Dhaka</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 mb-4 md:mb-0">
            {/* Changed social MotionLink to motion.div + onClick */}
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-blue-800 to-teal-500 rounded-full flex items-center justify-center text-white cursor-pointer"
              whileHover={{ scale: 1.15, backgroundColor: "#2563eb" }} // blue-600
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 150, damping: 10 }}
              onClick={() => window.open("https://www.facebook.com/", "_blank")}
            >
              <Facebook size={18} />
            </motion.div>

            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-blue-800 to-teal-500 rounded-full flex items-center justify-center text-white cursor-pointer"
              whileHover={{ scale: 1.15, backgroundColor: "#06b6d4" }} // cyan-500
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 150, damping: 10 }}
              onClick={() => window.open("https://x.com/", "_blank")}
            >
              <FaXTwitter size={18} />
            </motion.div>

            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-blue-800 to-teal-500 rounded-full flex items-center justify-center text-white cursor-pointer"
              whileHover={{ scale: 1.15, backgroundColor: "#ec4899" }} // pink-500
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 150, damping: 10 }}
              onClick={() => window.open("https://www.instagram.com/", "_blank")}
            >
              <Instagram size={18} />
            </motion.div>
          </div>

          <p className="text-gray-400 text-sm">&copy; {currentYear} HomeHero. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
