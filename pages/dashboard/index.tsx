"use client";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { motion } from "framer-motion";

export default function ComingSoon() {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
        {/* Animated Heading */}
        <motion.h1
          className="text-5xl font-semibold text-[#010D1A]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Coming Soon
        </motion.h1>

        {/* Animated Description */}
        <motion.p
          className="mt-4 text-lg text-gray-600 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          We are working on something amazing. Stay tuned for the launch!
        </motion.p>

        {/* Animated Button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        ></motion.div>
      </div>
      <Footer />
    </>
  );
}
