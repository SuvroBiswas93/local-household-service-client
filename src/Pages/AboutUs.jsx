import React from 'react';
import { motion } from 'framer-motion';
import { Users, Home, Star } from 'lucide-react';

const AboutUs = () => {
  return (
    <section className="py-16 ">
      <div className="w-11/12 mx-auto px-3  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 items-center">
        
        {/* Left Image */}
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1677087121017-b779a16ff921?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About Us"
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-teal-600 ">
            About HomeHero
          </h2>
          <p className="text-gray-500 dark:text-white leading-relaxed">
            At HomeHero, we are dedicated to providing top-notch household services
            with convenience, reliability, and professionalism. Our goal is to make
            your home a happier, cleaner, and safer place. With a team of skilled
            service providers, we ensure quality service for every task.
          </p>

          {/* Features / Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition">
              <Users className="w-8 h-8 text-teal-600 mb-2" />
              <p className="text-xl font-semibold text-gray-800 dark:text-white">500+</p>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Happy Clients</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition">
              <Home className="w-8 h-8 text-teal-600 mb-2" />
              <p className="text-xl font-semibold text-gray-800 dark:text-white">10+</p>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Service Categories</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition">
              <Star className="w-8 h-8 text-teal-600 mb-2" />
              <p className="text-xl font-semibold text-gray-800 dark:text-white">4.9/5</p>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Average Rating</p>
            </div>
          </div>

          {/* <button className="mt-4 px-6 py-3 flex items-center bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold transition">
            Learn More
          </button> */}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
