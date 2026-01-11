import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

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
    <div className="max-w-3xl mx-auto my-12 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-teal-600  mb-8">
        Contact Us
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Your Name"
            className={`w-full border rounded-md p-3 focus:ring-2 focus:ring-teal-500 focus:outline-none ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Your Email"
            className={`w-full border rounded-md p-3 focus:ring-2 focus:ring-teal-500 focus:outline-none ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Subject
          </label>
          <input
            type="text"
            {...register("subject", { required: "Subject is required" })}
            placeholder="Subject"
            className={`w-full border rounded-md p-3 focus:ring-2 focus:ring-teal-500 focus:outline-none ${
              errors.subject ? "border-red-500" : ""
            }`}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Message
          </label>
          <textarea
            rows="5"
            {...register("message", { required: "Message is required" })}
            placeholder="Write your message here..."
            className={`w-full border rounded-md p-3 focus:ring-2 focus:ring-teal-500 focus:outline-none ${
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
          className={`w-full py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </motion.button>
      </form>
    </div>
  );
};

export default ContactUs;
