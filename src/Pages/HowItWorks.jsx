// HowItWorks.jsx
import React from "react";
import { Search, UserCheck, Calendar, CheckCircle } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Browse Services",
    description: "Explore a variety of household services and select the one you need.",
    icon: <Search className="w-8 h-8 text-white" />,
    bgColor: "bg-teal-500",
  },
  {
    id: 2,
    title: "Choose Provider",
    description: "Select a trusted professional based on ratings, reviews, and availability.",
    icon: <UserCheck className="w-8 h-8 text-white" />,
    bgColor: "bg-blue-500",
  },
  {
    id: 3,
    title: "Schedule Service",
    description: "Pick a convenient time and date for the service to be delivered.",
    icon: <Calendar className="w-8 h-8 text-white" />,
    bgColor: "bg-green-500",
  },
  {
    id: 4,
    title: "Confirm & Enjoy",
    description: "Confirm your booking and enjoy hassle-free services at your home.",
    icon: <CheckCircle className="w-8 h-8 text-white" />,
    bgColor: "bg-purple-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16  dark:bg-slate-900">
      <div className="w-11/12 mx-auto  text-center px-3">
        <h2 className="text-3xl sm:text-4xl font-bold text-teal-600  mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-white mb-12 max-w-2xl mx-auto">
          Our platform makes it easy for you to book trusted household services in just a few steps.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <div
                className={`${step.bgColor} w-16 h-16 flex items-center justify-center rounded-full mb-4 text-white group-hover:scale-110 transition-transform duration-300`}
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-teal-500 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
