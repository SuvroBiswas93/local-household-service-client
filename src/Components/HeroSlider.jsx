import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const MotionLink = motion(Link)

const slides = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1675173579498-3b5eb0e191cf?auto=format&fit=crop&q=80&w=837",
    title: "Grow Green, Live Clean",
    desc: "Purify your air, brighten your home, and feel calm with indoor nature.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1648271824505-64e6b7371049?auto=format&fit=crop&q=80&w=871",
    title: "Nurture Nature, Nurture Yourself",
    desc: "A little care keeps your plants blooming and brings peace to your heart.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1758524052292-38f3ec63b572?auto=format&fit=crop&q=80&w=1032",
    title: "Let Nature Inspire Your Space",
    desc: "Simple greenery can transform your space into a refreshing oasis.",
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

  // ⭐ Auto Slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl shadow-lg">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold shadow-md cursor-pointer"
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
