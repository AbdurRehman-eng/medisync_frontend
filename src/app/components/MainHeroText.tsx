import { motion } from "framer-motion";

const HeroTextArea = () => {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center z-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-10 mt-10 "
          aria-label="Hero heading: Your Health, Our Priority – Trusted Medicines Delivered"
        >
          <span className="block bg-clip-text text-transparent bg-gradient-to-b from-[#001f3d] to-[#00457c] ">
            Your Health, Our Priority
          </span>
          <span className="block text-3xl md:text-4xl lg:text-5xl mt-4 text-gray-600">
            Trusted Medicines Delivered
          </span>
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8"
        >
          <div className="h-1 w-32 mx-auto bg-gradient-to-r g-gradient-to-b from-[#1f8bc5] to-[#5ab5d3] rounded-full"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroTextArea;import React from "react";
