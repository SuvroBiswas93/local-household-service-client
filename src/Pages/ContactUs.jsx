import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import contactImage from "../assets/CONTACT_US.avif";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://local-household-service-server.vercel.app/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, createdAt: new Date() }),
        }
      );

      if (!response.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully!");
      reset();
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b ">
      <div className="w-11/12 mx-auto grid lg:grid-cols-3 gap-10 items-start px-3">
        {/* Left Side - Contact Info Card */}
        <motion.div
          className="bg-teal-600 text-white rounded-3xl shadow-2xl p-8 flex flex-col items-start gap-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={contactImage}
            alt="Contact"
            className="rounded-2xl w-full mb-6 hidden lg:block object-cover h-60"
          />
          <h3 className="text-2xl font-bold mb-4">Contact Info</h3>
          <div className="space-y-3 text-white">
            <p>
              <strong>Phone:</strong> +8801758197272
            </p>
            <p>
              <strong>Email:</strong> info@homehero.com
            </p>
            <p>
              <strong>Address:</strong> 18 Street, Dhaka
            </p>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-10 lg:p-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-teal-600 mb-4 text-center lg:text-left">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-10 text-center lg:text-left">
            Have questions or need assistance? Fill out the form below, and our team will respond quickly.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Your Name ... "
                className={`peer w-full border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-black focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Your Email "
                className={`peer w-full border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-black focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Subject */}
            <div className="relative">
              <input
                type="text"
                {...register("subject", { required: "Subject is required" })}
                placeholder="Your Subject... "
                className={`peer w-full border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-black focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                  errors.subject ? "border-red-500" : ""
                }`}
              />
             
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                rows="5"
                {...register("message", { required: "Message is required" })}
                placeholder="Your Message... "
                className={`peer w-full border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-black focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                  errors.message ? "border-red-500" : ""
                }`}
              ></textarea>
             
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
