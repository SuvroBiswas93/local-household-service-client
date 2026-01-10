import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const testimonials = [
  {
    text: "Booked a plumber in minutes! Fast, professional, and very affordable.",
    name: "Ariana Gomez",
    role: "Homeowner",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    text: "The electrician arrived on time and fixed everything perfectly. Highly recommended!",
    name: "Michael Lee",
    role: "Apartment Owner",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    text: "Great platform! The cleaner did an amazing job—my house feels brand new.",
    name: "Sofia Mendes",
    role: "Working Professional",
    img: "https://randomuser.me/api/portraits/women/55.jpg",
  },
];

const ParallaxCard = ({ testimonial }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth rotation mapping
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  return (
    <motion.div
      className="p-6 bg-blue-100 rounded-xl shadow-lg cursor-pointer"
      style={{ rotateX, rotateY, x, y, perspective: 1000 }}
      whileHover={{ scale: 1.05 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) / 10);
        y.set((e.clientY - rect.top - rect.height / 2) / 10);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      <p className="text-gray-700 mb-4">{testimonial.text}</p>
      <div className="flex flex-col items-center">
        <img
          src={testimonial.img}
          className="w-16 h-16 rounded-full mb-2"
          alt={testimonial.name}
        />
        <h4 className="font-semibold">{testimonial.name}</h4>
        <p className="text-sm text-gray-500">{testimonial.role}</p>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section className="px-6 py-16 dark:bg-black text-gray-900 ">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-3xl font-bold text-teal-500  mb-4">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Real experiences from people who trust HomeHero for their household
          needs.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <ParallaxCard key={index} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
