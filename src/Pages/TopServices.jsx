import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../Components/ServiceCard";

const TopServices = () => {
  const [topServices, setTopServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://local-household-service-server.vercel.app/services/top-rated")
      .then((res) => setTopServices(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className=" w-11/12 mx-auto py-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Top Rated Services
      </h2>

      {loading ? (
        <div className="flex justify-center items-center mt-12">
          <div className="loader border-t-4 border-blue-600 border-solid rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topServices.length > 0 ? (
            topServices.map((service) => <ServiceCard key={service._id} data={service}></ServiceCard>)
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No top rated services found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TopServices;
