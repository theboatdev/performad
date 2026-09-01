import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="p-5 bg-white rounded-xl cursor-pointer border-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-center md:text-xl  text-[#010D1A]">
          {question}
        </h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          {isOpen ? (
            <Minus className="text-[#010D1A]" />
          ) : (
            <Plus className="text-[#010D1A]" />
          )}
        </motion.div>
      </div>
      <motion.p
        className="mt-3 text-[#010D1A]"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {answer}
      </motion.p>
    </motion.div>
  );
}
