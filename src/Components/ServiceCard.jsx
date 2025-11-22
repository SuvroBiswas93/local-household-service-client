import React from "react";
import { motion } from "framer-motion";
import { Tag, User, Layers } from "lucide-react";

const ServiceCard = ({ data }) => {
  const { Service, Provider, Category, Price, Description, Image } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.05,
        rotate: 0.5,
        y: -5,
        transition: { type: "spring", stiffness: 200, damping: 12 },
      }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden cursor-pointer max-w-sm mx-auto relative"
    >
      {/* Floating Glow */}
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-blue-300/20 to-transparent opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Image Section */}
      <motion.div
        className="h-48 w-full overflow-hidden"
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        whileInView={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img
          src={Image}
          alt={Service}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      {/* Info Section */}
      <div className="p-5 space-y-3">
        <motion.h3
          className="text-xl font-semibold text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {Service}
        </motion.h3>

        <motion.p
          className="text-gray-600 text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          {Description}
        </motion.p>

        <motion.div
          className="flex items-center gap-2 text-sm text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <User className="w-4 h-4 text-blue-600" />
          <span>{Provider}</span>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 text-sm text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <Layers className="w-4 h-4 text-green-600" />
          <span>{Category}</span>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 text-sm font-semibold text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Tag className="w-4 h-4 text-red-500" />
          <span>${Price}</span>
        </motion.div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-full cursor-pointer mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
