import { motion } from "framer-motion";

export default function About() {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    "Marketplace Management ✅",
    "Lead Gen Strategy ✅",
    "Search Optimize ✅",
    "eCommerce Strategy ✅",
    "PPC Management ✅",
    "Paid Social ✅",
  ];

  return (
    <motion.section
      id="about"
      className="py-10 md:py-20 bg-[#22A18D] relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="mx-4 max-w-7xl md:mx-10 lg:mx-20 xl:mx-auto">
        <motion.div className="space-y-10 md:space-y-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-5 md:text-center">
              <h1 className="text-3xl font-bold text-white md:text-5xl">
                One Agency with Multiple Expertise to Save More Money in Your
                Pocket
              </h1>
              <p className="text-lg text-gray-200 md:text-xl">
                We empower brands to broaden their reach across multiple
                channels for rapid revenue growth. <br />
                No hidden fees, No headaches.
              </p>
            </div>
          </motion.div>

          {/* Mobile: Features are vertical, three before and three after logo */}
          <div className="flex flex-col items-center md:hidden space-y-3">
            {features.slice(0, 3).map((text, index) => (
              <motion.div
                key={index}
                className="w-full max-w-xs p-3 text-sm text-center text-white bg-black rounded-full"
                variants={featureVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {text}
              </motion.div>
            ))}
          </div>

          {/* Center Logo */}
          <div className="relative flex items-center justify-center w-full h-40 md:h-96 lg:h-[12rem]">
            <img
              src="/icon.png"
              alt=""
              className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
            />

            {/* Desktop: Features appear in a circular layout */}
            <div className="hidden md:block">
              {features.map((text, index) => (
                <motion.div
                  key={index}
                  className="absolute w-44 md:w-48 lg:w-52 p-3 text-sm text-center text-white bg-black rounded-full whitespace-nowrap"
                  style={{
                    top: `${
                      45 +
                      60 * Math.sin((index * 2 * Math.PI) / features.length)
                    }%`,
                    left: `${
                      42 +
                      45 * Math.cos((index * 2 * Math.PI) / features.length)
                    }%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  variants={featureVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {text}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: Features continue below the logo */}
          <div className="flex flex-col items-center md:hidden space-y-3">
            {features.slice(3, 6).map((text, index) => (
              <motion.div
                key={index}
                className="w-full max-w-xs p-3 text-sm text-center text-white bg-black rounded-full"
                variants={featureVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {text}
              </motion.div>
            ))}
          </div>

          {/* Brands Section */}
          <motion.div
            className="mt-10 md:mt-32 space-y-6 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-lg font-semibold tracking-wide text-white uppercase">
              Brands we work with
            </h1>
            <motion.div
              className="w-full p-2 md:w-3/5 mx-auto bg-gray-100 rounded-2xl bg-opacity-70 md:bg-opacity-100 md:p-5 overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                className="flex items-center space-x-6"
                initial={{ x: 0 }}
                animate={{ x: ["0%", "-100%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 15,
                  ease: "linear",
                }}
              >
                {/* Logos */}
                {[
                  "merc",
                  "hartan",
                  "discovery",
                  "giordana",
                  "ng",
                  "hp",
                  "tcl",
                  "active",
                  "gnz",
                  "simplytek",
                  "cat",
                ].map((logo, index) => (
                  <img
                    key={index}
                    className="h-5 md:h-8 filter grayscale"
                    src={`images/${logo}.png`}
                    alt={logo}
                  />
                ))}
                {/* Repeat logos for seamless animation */}
                {[
                  "merc",
                  "hartan",
                  "discovery",
                  "giordana",
                  "ng",
                  "hp",
                  "tcl",
                  "active",
                  "gnz",
                  "simplytek",
                  "cat",
                ].map((logo, index) => (
                  <img
                    key={index + 10}
                    className="h-5 md:h-8 filter grayscale"
                    src={`images/${logo}.png`}
                    alt={logo}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
