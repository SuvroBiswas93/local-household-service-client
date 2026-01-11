import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "How can I book a service?",
        answer:
            "You can browse the services, select the one you want, and click the 'Book Now' button. Follow the instructions to confirm your booking.",
    },
    {
        question: "Can I reschedule my booking?",
        answer:
            "Yes! Go to 'My Bookings' and choose the booking you want to reschedule. You can change the date/time as per the provider's availability.",
    },
    {
        question: "Are the service providers verified?",
        answer:
            "Absolutely. All service providers are verified and background-checked to ensure quality and safety.",
    },
    {
        question: "What payment methods are accepted?",
        answer:
            "Currently, we accept cash payments only. We are working on integrating online payment options, which will be available soon.",
    },
    {
        question: "Can I cancel a service booking?",
        answer:
            "Yes, you can cancel a booking from 'My Bookings' page. Cancellation policies may vary depending on the service.",
    },
];

const FAQItem = ({ faq, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <button
                className="w-full flex justify-between items-center py-4 px-2 text-left focus:outline-none"
                onClick={onClick}
            >
                <span className="font-medium text-gray-800 dark:text-gray-100">
                    {faq.question}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={20} className="text-teal-500" />
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-2 pb-4 text-gray-600 dark:text-gray-300 text-sm"
                    >
                        {faq.answer}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleIndex = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-3xl mx-auto my-12 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-teal-600  mb-8">
                Frequently Asked Questions
            </h2>

            <div className="space-y-2">
                {faqs.map((faq, index) => (
                    <FAQItem
                        key={index}
                        faq={faq}
                        isOpen={openIndex === index}
                        onClick={() => toggleIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FAQ;
