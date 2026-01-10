import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTopCTA = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 cursor-pointer right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-900 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-md hover:shadow-xl focus:outline-none"
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} />
       To The Top
    </motion.button>
  );
};

export default ScrollToTopCTA;
