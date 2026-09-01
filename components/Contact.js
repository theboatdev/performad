/* eslint-disable comma-dangle */
/* eslint-disable lines-around-directive */
/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export const Join = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://nodemailer-perfomad.vercel.app/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Your information has been successfully submitted!");
        setName(""); // Clear the input fields
        setEmail("");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="">
      <div className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8">
        <div className="text-center">
          <p className="text-gray-400 text-base font-normal">
            After you fill out this order request, we will contact you within 24
            hours to go over details before the service is started.
            <br /> If you require information immediately, please contact us on
            +94 76 320 9452 or at info@perfomad.com
          </p>
        </div>

        <div className="mx-auto max-w-4xl pt-5">
          <div className="sm:flex items-center mx-5 p-5 sm:p-0 rounded-xl justify-between bg-gray-800 sm:rounded-full">
            <motion.div
              className="flex-grow sm:mr-4 mb-4 sm:mb-0" // Added mb-4 for spacing in mobile view
              variants={inputVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the component is visible
            >
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="w-full py-3 px-4 lg:text-lg text-gray-100 rounded-full bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#25A18E]"
                placeholder="Your name"
                autoComplete="off"
              />
            </motion.div>
            <motion.div
              className="flex-grow sm:mr-4"
              variants={inputVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the component is visible
            >
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full py-3 px-4 lg:text-lg text-gray-100 rounded-full bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#25A18E]"
                placeholder="Your email"
                autoComplete="off"
              />
            </motion.div>
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the component is visible
            >
              <button
                onClick={handleSubmission}
                disabled={isLoading}
                type="submit"
                className={`w-full sm:w-auto mt-2 px-8 py-3 text-lg font-semibold text-black bg-white rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500${
                  isLoading
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
