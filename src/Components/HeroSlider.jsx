import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const MotionLink = motion(Link)

const slides = [
  {
    image:"https://plus.unsplash.com/premium_photo-1664910117544-5a3eed7c6413?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Clean Home, Clear Mind",
    desc: "Enjoy spotless rooms and stress-free living with our expert cleaning support.",
  },
  {
    image:"https://plus.unsplash.com/premium_photo-1682126009570-3fe2399162f7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Care That Makes Life Easier",
    desc: "Reliable household help to keep your home running smoothly every day.",
  },
  {
    image:"https://plus.unsplash.com/premium_photo-1661719110458-f97f4b0a9bd4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Comfort Starts at Home",
    desc: "From cleaning to maintenance, we keep your space fresh, tidy, and welcoming.",
  },
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto Slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="relative w-full h-[375px] md:h-[450px] lg:h-[480px] overflow-hidden rounded-xl shadow-lg">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[index].image}
            alt="slide"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Text content */}
          <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-16 text-white max-w-lg">
            <motion.h1
              key={slides[index].title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              {slides[index].title}
            </motion.h1>

            <motion.p
              key={slides[index].desc}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-md md:text-lg mb-6"
            >
              {slides[index].desc}
            </motion.p>

            <MotionLink
              to='/services'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="px-6 py-4 bg-linear-to-r from-teal-500 to-blue-700 hover:from-blue-800 hover:to-teal-600
 rounded-lg font-semibold shadow-md cursor-pointer"
            >
              Explore More
            </MotionLink>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left & Right Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 cursor-pointer hover:bg-white/50 text-white p-2 rounded-full"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer  bg-white/30 hover:bg-white/50 text-white p-2 rounded-full"
      >
        ❯
      </button>

      {/* Indicators */}
      <div className="absolute bottom-5 w-full flex justify-center gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
