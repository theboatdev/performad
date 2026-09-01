import { motion } from "framer-motion";
import Typing from "./Typing";
import { useState, useEffect } from "react";

export default function Action() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common).sort();
        setCountries(countryNames);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const fadeInUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay },
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    country: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.country ||
      !formData.message
    ) {
      alert("Please fill in all required fields.");
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
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Your information has been successfully submitted!");
        setFormData({
          name: "",
          email: "",
          website: "",
          country: "",
          message: "",
        });
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

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-10 px-2 md:px-6  md:py-15 bg-[#22A18D] text-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="mt-4 text-3xl font-bold md:text-6xl leading-tight"
          variants={fadeInUp(0.2)}
        >
          Ready to Scale your <br className="sm:hidden" />
          <Typing />
        </motion.h1>

        <motion.h2
          className="mt-4 text-lg md:text-xl text-white"
          variants={fadeInUp(0.4)}
        >
          Complete the form below for us to schedule a FREE STRATEGY CALL
          tailored to help grow your business
        </motion.h2>

        <motion.form
          onSubmit={handleSubmission}
          className="mt-8 bg-[#22A18D] bg-opacity-80 p-2 rounded-2xl  space-y-6"
          variants={fadeInUp(0.6)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              className="w-full p-3 rounded-lg placeholder-[#22A18D] bg-white text-black focus:outline-none focus:ring-2 focus:ring-white transition"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Business Email"
              required
              value={formData.email}
              className="w-full p-3 rounded-lg bg-white placeholder-[#22A18D] text-black focus:outline-none focus:ring-2 focus:ring-white transition"
              onChange={handleChange}
            />

            <input
              type="url"
              name="website"
              placeholder="Business URL"
              value={formData.website}
              className="w-full p-3 rounded-lg bg-white placeholder-[#22A18D] text-black focus:outline-none focus:ring-2 focus:ring-white transition"
              onChange={handleChange}
            />
            <select
              name="country"
              required
              value={formData.country}
              className="w-full p-3 rounded-lg bg-white text-[#22A18D] focus:outline-none focus:ring-2 focus:ring-white transition"
              onChange={handleChange}
            >
              <option value="" className="text-[#22A18D]">
                Country
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country} className="text-[#22A18D]">
                  {country}
                </option>
              ))}
            </select>
          </div>

          <textarea
            name="message"
            placeholder="Tell a bit about your business and the requirement? "
            required
            value={formData.message}
            className="w-full p-3 rounded-lg bg-white placeholder-[#22A18D] text-black focus:outline-none focus:ring-2 focus:ring-white transition h-36"
            onChange={handleChange}
          />

          <div className="flex justify-center">
            <div className="flex flex-col items-center w-full sm:w-auto">
              <button
                disabled={isLoading}
                type="submit"
                className="px-4 sm:px-6 py-2 bg-white placeholder-[#22A18D] text-black font-semibold rounded-full text-sm sm:text-lg hover:bg-gray-300 transition duration-300 shadow-md w-full sm:w-auto text-center disabled:opacity-50"
              >
                {isLoading
                  ? "Submitting..."
                  : "Get into a free STRATEGY call now"}
              </button>
              <p className="text-black mt-1 text-center">
                * no agreements, 100% free
              </p>
            </div>
          </div>
        </motion.form>
      </div>
    </motion.section>
  );
}
