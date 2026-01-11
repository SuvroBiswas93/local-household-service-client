import React from "react";
import { User, Layers, Tag } from "lucide-react";
import { Link } from "react-router";

const ServiceCard = ({ data }) => {
  const { Service, Provider, Category, Price, Description, Image, _id } = data;

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden w-11/12 mx-auto cursor-pointer 
      transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]"
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={Image}
          alt={Service}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">

        <h3 className="text-xl font-semibold text-gray-800">{Service}</h3>
        <p className="text-gray-600 text-sm">{Description}</p>

        {/* Provider */}
        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <User className="w-4 h-4 text-blue-500" />
          <span>{Provider}</span>
        </div>

        {/* Category */}
        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <Layers className="w-4 h-4 text-green-500" />
          <span>{Category}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 text-gray-800 font-semibold">
          <Tag className="w-4 h-4 text-red-500" />
          <span>${Price}</span>
        </div>

        <Link
          to={`/service-details/${_id}`}
          className="block w-full bg-teal-500 cursor-pointer text-center text-white py-2 rounded-lg hover:bg-teal-600 transition"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default ServiceCard;
