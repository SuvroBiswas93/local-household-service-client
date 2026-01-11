import React from "react";
import { Home, Droplet, Zap, Paintbrush, Wrench, Leaf } from "lucide-react";
import { Link } from "react-router";

const services = [
  { id: 1, name: "Home Cleaning", icon: <Home className="w-6 h-6 text-white" />, link: "/services?category=Home Cleaning" },
  { id: 2, name: "Plumbing", icon: <Droplet className="w-6 h-6 text-white" />, link: "/services?category=Plumbing" },
  { id: 3, name: "Electrical Repair", icon: <Zap className="w-6 h-6 text-white" />, link: "/services?category=Electrical Repair" },
  { id: 4, name: "Painting", icon: <Paintbrush className="w-6 h-6 text-white" />, link: "/services?category=Painting" },
  { id: 5, name: "Appliance Repair", icon: <Wrench className="w-6 h-6 text-white" />, link: "/services?category=Appliance Repair" },
  { id: 6, name: "Gardening", icon: <Leaf className="w-6 h-6 text-white" />, link: "/services?category=Gardening" },
];

const ServiceOverview = () => {
  return (
    <section className="py-16  dark:bg-slate-900">
      <div className="w-11/12 mx-auto text-center px-3">
        <h2 className="text-3xl sm:text-4xl font-bold text-teal-600 mb-4">
          Our Service Categories
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Explore our wide range of household services. Choose a category and book your trusted professional in minutes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              to={service.link}
              className="group bg-white dark:bg-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div className="bg-teal-500 w-14 h-14 flex items-center justify-center rounded-full mb-4 group-hover:bg-teal-600 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-teal-500 transition-colors duration-300">
                {service.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
