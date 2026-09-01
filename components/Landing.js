import { motion } from "framer-motion";

export default function Landing() {
  return (
    <section>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row mt-5 items-center md:items-start md:space-x-20 p-5">
        {/* Left Column - Text Content */}
        <motion.div
          className="w-full mt-1 md:mt-10 text-center md:text-center space-y-6 md:space-y-8 flex flex-col items-center md:items-start"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold px-0 text-[#010D1A] sm:text-5xl md:text-6xl">
              The Integrated Marketing Agency Built by True Marketing Experts{" "}
              <br />
              to
              <span className="text-[#22A18D]"> 3X Your Revenue.</span>
            </h1>

            <h6 className="text-lg px-0 text-gray-600 md:text-xl">
              We are specialized in delivering cutting-edge tools and services
              to help you scale, streamline operations, and create exceptional
              customer experience. Let us empower your brand to thrive in the
              digital landscape.
            </h6>
          </motion.div>
          <motion.div
            className="md:w-full transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="space-y-5">
              <a
                href="#contact"
                className="px-2 py-2 font-semibold text-lg text-white bg-[#25A18E] shadow-lg rounded-2xl hover:translate-y-1.5 md:text-2xl md:px-8 md:py-3 hover:bg-gradient-to-br hover:bg-gray-600"
              >
                CLAIM YOUR FREE STRATEGY CALL
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="inline-block w-5 h-5 ml-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <motion.div
                className="pt-2 text-sm text-gray-600 sm:pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                *no agreements, 100% free
              </motion.div>
            </div>
            <div className="mt-0 text-center mb-0 md:mt-1">
              <div className="w-full p-0 mx-auto bg-white rounded-2xl bg-opacity-70 md:bg-opacity-100 md:p-5">
                <h1 className="text-lg mt-5 font-semibold tracking-wide text-center text-gray-600 uppercase md:mx-10 md:text-gray-600">
                  EXPERTISE IN
                </h1>
                <div className="flex flex-wrap justify-center items-center mt-2 ">
                  <img
                    className="h-12 md:h-12 m-0 p-0"
                    src="expertise/amazon.png"
                    alt="amazon"
                  />
                  <img
                    className="h-12 md:h-16 m-0 p-0"
                    src="expertise/meta.png"
                    alt="meta"
                  />
                  <img
                    className="h-12 md:h-16 ml-2 p-0"
                    src="expertise/tiktok.png"
                    alt="tiktok"
                  />
                  <img
                    className="h-12 md:h-16 m-3 p-0"
                    src="expertise/google-ads.png"
                    alt="google-ads"
                  />
                  <img
                    className="h-8 md:h-12 m-3 p-0"
                    src="expertise/noon.png"
                    alt="noon"
                  />
                  <img
                    className="h-8 md:h-8 m-3 p-0"
                    src="expertise/shopify.png"
                    alt="shopify"
                  />
                  <img
                    className="h-8 md:h-8 m-3 p-0"
                    src="expertise/walmart.png"
                    alt="walmart"
                  />
                  <img
                    className="h-8 md:h-8 m-3 p-0"
                    src="expertise/ga.png"
                    alt="google analytics"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
