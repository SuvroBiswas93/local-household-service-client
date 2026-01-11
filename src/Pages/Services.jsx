import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ServiceCard from "../Components/ServiceCard";

const Services = () => {
  const [serviceData, setServiceData] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://local-household-service-server.vercel.app/services?minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      setServiceData(response.data);
      console.log("Fetched data:", response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <div className="w-11/12 mx-auto mt-5">
      {/* Filter Inputs */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center max-w-4xl mx-auto">
        <input
          type="number"
          placeholder="Min Price"
          className="w-full sm:w-1/4 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="w-full sm:w-1/4 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button
          onClick={fetchServices}
          className="w-full sm:w-auto bg-teal-500 cursor-pointer text-white font-semibold px-6 py-2 rounded-md hover:bg-teal-600 transition"
        >
          Apply Filter
        </button>
      </div>

      {/* Service Display */}
      {loading ? (
        <div className="flex justify-center items-center mt-12">
          <div className="loader border-t-4 border-teal-600 border-solid rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {serviceData.length > 0 ? (
            serviceData.map((data) => (
              <ServiceCard key={data._id} data={data} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No services found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Services;
