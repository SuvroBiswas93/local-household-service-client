import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user bookings
  useEffect(() => {
    if (!user?.email) return;
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `https://local-household-service-server.vercel.app/bookings?userEmail=${user.email}`
        );
        setBookings(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Cancel booking
  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://local-household-service-server.vercel.app/bookings/${id}`
        );
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
        setBookings((prev) => prev.filter((booking) => booking._id !== id));
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to cancel booking.", "error");
      }
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading your bookings...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">You have no bookings.</p>
      ) : (
        <>
          {/* Table for md and up */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Service</th>
                  <th className="py-3 px-4 text-left">Service ID</th>
                  <th className="py-3 px-4 text-left">Booking Date</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b last:border-none hover:bg-gray-50 transition-all"
                  >
                    <td className="py-3 px-4 font-bold">{booking.Service}</td>
                    <td className="py-3 px-4">{booking.serviceId}</td>
                    <td className="py-3 px-4">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-green-600 font-semibold">
                      ${booking.price}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for mobile */}
          <div className="md:hidden flex flex-col gap-4">
            {bookings.map((booking) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-white rounded-xl shadow-xl "
              >
                <p className="font-bold">
                  <span className="">Service:</span> {booking.Service}
                </p>
                <p>
                  <span className="font-semibold">Service ID:</span> {booking.serviceId}
                </p>
                <p>
                  <span className="font-semibold">Booking Date:</span>{" "}
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Price:</span>{" "}
                  <span className="text-green-600 font-semibold">${booking.price}</span>
                </p>
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="mt-2 px-4 py-2 bg-red-500 cursor-pointer text-white rounded-lg hover:bg-red-600 transition-all w-full"
                >
                  Cancel
                </button>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyBookings;
