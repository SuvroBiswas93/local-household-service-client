import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Verified Professionals",
    desc: "Every service provider is background-checked and reviewed by real users.",
    img: "https://cdn-icons-png.flaticon.com/512/1827/1827504.png",
  },
  {
    title: "Easy Online Booking",
    desc: "Book services anytime with our smooth and user-friendly interface.",
    img: "https://cdn-icons-png.flaticon.com/512/814/814513.png",
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden fees—just honest pricing and quality service you can trust.",
    img: "https://cdn-icons-png.flaticon.com/512/929/929610.png",
  },
];

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      className="bg-green-200 p-6 rounded-xl shadow cursor-pointer"
      whileHover={{ scale: 1.05, y: -5 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5, type: "spring", stiffness: 120 }}
    >
      <img src={feature.img} alt={feature.title} className="w-14 mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.desc}</p>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  return (
    <motion.section
      className="px-6 py-16 bg-blue-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Us?
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Finding reliable household services should be simple. HomeHero connects you with
          trusted local experts—quickly and safely.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
