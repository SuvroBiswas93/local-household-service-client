import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Droplets, Wrench, Leaf } from "lucide-react";

const tips = [
  {
    id: 1,
    title: "Keep Your Home Clean Regularly",
    description:
      "Regular cleaning prevents dust buildup, improves air quality, and keeps your home healthy.",
    icon: <Lightbulb className="w-6 h-6" />,
    color: "bg-teal-500",
  },
  {
    id: 2,
    title: "Prevent Plumbing Issues Early",
    description:
      "Check for leaks and clean drains frequently to avoid costly plumbing repairs.",
    icon: <Droplets className="w-6 h-6" />,
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Maintain Electrical Safety",
    description:
      "Avoid overloading sockets and schedule regular electrical inspections for safety.",
    icon: <Wrench className="w-6 h-6" />,
    color: "bg-orange-500",
  },
  {
    id: 4,
    title: "Seasonal Home Maintenance",
    description:
      "Prepare your home for seasonal changes with timely servicing and inspections.",
    icon: <Leaf className="w-6 h-6" />,
    color: "bg-green-500",
  },
];

const TipsAndGuides = () => {
  return (
    <section className="py-16 ">
      <div className="w-11/12 mx-auto px-3">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-teal-600 ">
            Tips & Guides
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-300  mx-auto">
            Helpful home care tips and expert guidance to keep your house safe,
            clean, and well-maintained.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip) => (
            <motion.div
              key={tip.id}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
            >
              <div
                className={`w-12 h-12 ${tip.color} text-white rounded-full flex items-center justify-center mb-4`}
              >
                {tip.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {tip.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {tip.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TipsAndGuides;
