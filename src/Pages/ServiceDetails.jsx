import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { User, Tag, Layers } from "lucide-react";

const ServiceDetails = () => {
    const data = useLoaderData();
    const { Service, Provider, Category, Price, Description, Image, _id } =
        data.result;

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleBooking = async (e) => {
        e.preventDefault();
        const bookingDate = e.target.bookingDate.value;

        const bookingInfo = {
            userEmail: user?.email,
            serviceId: _id,
            bookingDatedate: bookingDate,
            price: Price,
        };

        try {
            await axios.post(
                "https://local-household-service-server.vercel.app/bookings",
                bookingInfo
            );
            toast.success("Booking Successful!", );
            setOpen(false);
            navigate("/my-bookings");
        } catch (error) {
            toast.error("Booking Failed!", error);
            setOpen(false)
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 pb-16">

            {/* HEADER */}
            <div className="relative w-full h-64 bg-linear-to-r from-blue-500 to-blue-400 flex items-center justify-center text-white shadow-xl">
                <div className="backdrop-blur-md bg-white/10 px-8 py-4 rounded-2xl border border-white/20 shadow-lg">
                    <h1 className="text-4xl md:text-5xl font-bold drop-shadow">
                        {Service}
                    </h1>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-6xl mx-auto px-6 -mt-24">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden"
                >
                    {/* ACCENT LEFT BAR */}
                    <div className="absolute left-0 top-0 h-full w-2 bg-blue-600"></div>

                    <div className="grid md:grid-cols-2 gap-10 items-start">

                        {/* Floating Image Card */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="rounded-2xl overflow-hidden shadow-xl  bg-white"
                        >
                            <img
                                src={Image}
                                alt={Service}
                                className="w-full h-[350px] object-cover"
                            />
                        </motion.div>

                        {/* Details */}
                        <div className="space-y-6">
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {Description}
                            </p>

                            {/* Info Badges */}
                            <div className="flex flex-wrap gap-3">
                                <span className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full">
                                    <User size={18} /> {Provider}
                                </span>

                                <span className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full">
                                    <Layers size={18} /> {Category}
                                </span>

                                <span className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full">
                                    <Tag size={18} /> ${Price}
                                </span>
                            </div>

                            {/* Price + Button */}
                            <div className="pt-4">
                                <button
                                    onClick={() => setOpen(true)}
                                    className="w-full md:w-auto px-8 py-3 cursor-pointer bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all shadow-md"
                                >
                                    Book Now
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
                            className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-center">
                                Confirm Booking
                            </h2>

                            <form onSubmit={handleBooking} className="space-y-5">

                                {/* ==== Added serviceId field ==== */}
                                <div>
                                    <label className="text-sm font-semibold">Service ID</label>
                                    <input
                                        type="text"
                                        value={_id}
                                        readOnly
                                        className="w-full bg-gray-100 px-3 py-2 border rounded"
                                    />
                                </div>

                                {/* ==== Added price field ==== */}
                                <div>
                                    <label className="text-sm font-semibold">Price</label>
                                    <input
                                        type="text"
                                        value={`$${Price}`}
                                        readOnly
                                        className="w-full bg-gray-100 px-3 py-2 border rounded"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-semibold">Email</label>
                                    <input
                                        type="email"
                                        value={user?.email}
                                        readOnly
                                        className="w-full bg-gray-100 px-3 py-2 border rounded"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-semibold">Booking Date</label>
                                    <input
                                        type="date"
                                        name="bookingDate"
                                        required
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-3">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="px-4 py-2 rounded-lg bg-red-400 cursor-pointer text-white"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
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

