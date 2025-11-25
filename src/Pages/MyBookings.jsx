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

  // Review modal state
  const [showModal, setShowModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Fetch user bookings
  useEffect(() => {
    if (!user?.email) return;
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `https://local-household-service-server.vercel.app/bookings`
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

  // Open review modal
  const openReviewModal = (booking) => {
    setCurrentBooking(booking);
    setRating(0);
    setComment("");
    setShowModal(true);
  };

  // Submit review
  const handleSubmitReview = async () => {
    if (!rating) {
      toast.error("Please provide a rating");
      return;
    }
    try {
      await axios.post(
        `https://local-household-service-server.vercel.app/services/${currentBooking.serviceId}/reviews`,
        { rating, comment, userEmail: user.email }
      );
      toast.success("Review submitted successfully");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-12">
        <div className="loader border-t-4 border-blue-600 border-solid rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">You have no bookings.</p>
      ) : (
        <>
          {/* Table for md and up */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full dark:bg-black rounded-xl shadow-lg overflow-hidden">
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
                    className="border-b last:border-none  transition-all"
                  >
                    <td className="py-3 px-4 font-bold">{booking.Service}</td>
                    <td className="py-3 px-4">{booking.serviceId}</td>
                    <td className="py-3 px-4">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-green-600 font-semibold">
                      ${booking.price}
                    </td>
                    <td className="py-3 px-4 text-center flex flex-col gap-1 items-center">
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => openReviewModal(booking)}
                        className="px-4 py-2 cursor-pointer bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                      >
                        Add Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for mobile */}
          <div className="md:hidden flex flex-col gap-4 ">
            {bookings.map((booking) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="p-4 dark:bg-black rounded-xl shadow-xl "
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
                <div className="flex flex-col gap-2 mt-2">
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-lg hover:bg-red-600 transition-all w-full"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => openReviewModal(booking)}
                    className="px-4 py-2 bg-yellow-400 cursor-pointer text-white rounded-lg hover:bg-green-600 transition-all w-full"
                  >
                    Add Review
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Review Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 dark:bg-black  g-opacity-50b flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 bg-linear-to-r from-green-400 to-blue-400  rounded-lg p-6 w-11/12 max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4 text-black">
                Add Review for {currentBooking.Service}
              </h2>
              <div className="flex flex-col gap-3 mb-4">
                <label className="font-semibold text-black">Rating:</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full border rounded-md p-2 text-black"
                >
                  <option value={0}>Select rating</option>
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
                <label className="font-semibold text-black">Comment (optional):</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border rounded-md p-2 text-black"
                  placeholder="Write your comment..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-red-400 rounded-lg cursor-pointer hover:bg-red-500 text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  className="px-4 py-2 bg-green-500 rounded-lg cursor-pointer hover:bg-green-600 text-white"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
};

export default MyBookings;
