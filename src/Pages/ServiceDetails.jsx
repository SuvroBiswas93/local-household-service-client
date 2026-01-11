import React, { useContext, useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { User, Tag, Layers } from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider";

const ServiceDetails = () => {
  const data = useLoaderData();
  const { Service, Provider, Category, Price, Description, Image, _id, providerEmail, created_At,
    created_By, Email } = data.result;
  console.log(data.result)

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // NEW STATES
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const isOwner = user?.email === providerEmail;

  // CHECK IF USER ALREADY BOOKED
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://local-household-service-server.vercel.app/bookings?userEmail=${user.email}`)
        .then((res) => {
          const found = res.data.find((b) => b.serviceId === _id);
          if (found) {
            setAlreadyBooked(true);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [_id, user]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const bookingDate = e.target.bookingDate.value;

    const bookingInfo = {
      userEmail: user?.email,
      serviceId: _id,
      bookingDate: bookingDate,
      price: Price,
      Service: Service,
    };

    try {
      await axios.post(
        "https://local-household-service-server.vercel.app/bookings",
        bookingInfo
      );
      toast.success("Booking Successful!");
      setOpen(false);
      navigate("/my-bookings");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Booking Failed!");
      setOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 pb-16">
      {/* HEADER */}
      <div className="relative w-full h-64 bg-linear-to-r from-teal-500 to-teal-400 flex items-center justify-center text-white shadow-xl">
        <div className="backdrop-blur-md bg-white/10 px-8 py-4 rounded-2xl border border-white/20 shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow">{Service}</h1>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-11/12 mx-auto px-6 -mt-24">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden"
        >
          {/* ACCENT LEFT BAR */}
          <div className="absolute left-0 top-0 h-full w-2 bg-teal-600"></div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Floating Image Card */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-xl bg-white"
            >
              <img src={Image} alt={Service} className="w-full h-[350px] object-cover" />
            </motion.div>

            {/* Details */}
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">{Description}</p>

              {/* Info Badges */}
              {/* Additional Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm max-w-md">
                <h3 className="text-xl font-semibold text-teal-800 mb-4">Service Details Info</h3>

                <div className="flex flex-col gap-3 text-gray-700">
                  <div className="flex justify-between items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                    <span className="font-medium text-teal-600">Provider Email:</span>
                    <span className="text-gray-800">{Email}</span>
                  </div>

                  <div className="flex justify-between items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                    <span className="font-medium text-teal-600">Created By:</span>
                    <span className="text-gray-800">{created_By || "Not Available"}</span>
                  </div>

                  <div className="flex justify-between items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                    <span className="font-medium text-teal-600">Created At:</span>
                    <span className="text-gray-800">
                      {created_At ? new Date(created_At).toLocaleDateString() : "Not Available"}
                    </span>
                  </div>
                </div>
              </div>



              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-teal-700 rounded-full">
                  <User size={18} /> {Provider}
                </span>

                <span className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full">
                  <Layers size={18} /> {Category}
                </span>

                <span className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full">
                  <Tag size={18} /> ${Price}
                </span>
              </div>

              {/* Reviews Section */}
              {data.result.reviews && data.result.reviews.length > 0 && (
                <div className="max-w-4xl mx-auto mt-12">
                  <h2 className="text-2xl font-bold mb-6 text-teal-700">Reviews</h2>
                  <div className="space-y-4">
                    {data.result.reviews.map((review, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-blue-50 rounded-xl shadow-sm flex flex-col gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">{review.userEmail}</span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927C9.316 2.091 10.684 2.091 10.951 2.927l1.286 3.963a1 1 0 0 0 .95.69h4.171c.969 0 1.371 1.24.588 1.81l-3.375 2.455a1 1 0 0 0-.364 1.118l1.286 3.963c.267.836-.69 1.528-1.396 1.118l-3.375-2.455a1 1 0 0 0-1.176 0l-3.375 2.455c-.706.41-1.663-.282-1.396-1.118l1.286-3.963a1 1 0 0 0-.364-1.118L2.958 9.39c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 0 0 .951-.69l1.286-3.963z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        {review.comment && <p className="text-gray-700">{review.comment}</p>}
                        <span className="text-sm text-gray-400">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}


              {/* Book Button */}
              <div className="pt-4">
                <button
                  onClick={() => {
                    if (!user) return toast.error("Please login to book!");
                    if (isOwner) return toast.error("You cannot book your own service!");
                    if (alreadyBooked) return toast.error("Already booked!");
                    setOpen(true);
                  }}
                  disabled={!user || isOwner || alreadyBooked}
                  className={`w-full md:w-auto px-8 py-3 rounded-xl font-semibold shadow-md
                    ${!user || isOwner || alreadyBooked
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-teal-600 cursor-pointer text-white hover:bg-teal-700"
                    }
                  `}
                >
                  {isOwner
                    ? "Owner (Can't Book)"
                    : alreadyBooked
                      ? "Already Booked"
                      : "Book Now"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-white p-8  rounded-2xl w-full max-w-md shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-4 text-center text-teal-400">Confirm Booking</h2>

              <form onSubmit={handleBooking} className="space-y-5 ">
                <div>
                  <label className="text-sm font-semibold text-black">Service ID</label>
                  <input
                    type="text"
                    value={_id}
                    readOnly
                    className="w-full bg-gray-100 text-black px-3 py-2  rounded"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-black">Price</label>
                  <input
                    type="text"
                    value={`$${Price}`}
                    readOnly
                    className="w-full bg-gray-100 text-black px-3 py-2  rounded"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-black">Email</label>
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="w-full bg-gray-100 text-black px-3 py-2  rounded"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-black ">Booking Date</label>
                  <input
                    type="date"
                    name="bookingDate"
                    required
                    className="w-full px-3 py-2 border rounded bg-gray-300 text-black "
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 text-black">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded-lg bg-red-400 hover:bg-red-500 cursor-pointer text-black"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceDetails;
