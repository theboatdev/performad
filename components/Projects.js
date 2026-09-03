import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "PAD Ongoing Expert Management",
    description:
      "PAD ongoing management is designed to take your stress away. The PAD team will handle everything, take care of operations, and report directly to you. This approach allows you to focus on business development without worrying about campaign or marketplace shop performance.",
    image: "/homePage/PAD Ongoing Expert Management.jpg",
    size: "l",
  },
  {
    title: "PAD One-Time Strong Setup",
    description:
      "Get a robust foundation for your campaigns with a one-time setup by the PAD team. This service ensures your marketplace or advertising campaigns are optimized for success from the start.",
    image: "/homePage/PAD One-Time Strong Setup.jpg",
    size: "l",
  },
  {
    title: "Ongoing or One-Time Consulting",
    description:
      "PAD team provides one-time or ongoing step-by-step guidance with data-driven prioritization & optimizations. Ideal for agencies and companies with an in-house team seeking expert insights.",
    image: "/homePage/Ongoing or One-Time Consulting.jpg",
    size: "m",
  },
  {
    title: "Deep One-Time Audit",
    description:
      "Curious if your current setup is effective? PAD team conducts a thorough audit of your entire strategy and setup for a one-time cost, providing insights into areas of improvement.",
    image: "/homePage/Deep One-Time Audit.jpg",
    size: "m",
  },
  {
    title: "Committed Performance",
    description:
      "Revenue split partnership—less risk for you, higher reward for us. This model ensures PAD is fully invested in your success.",
    image: "/homePage/Committed Performance.jpg",
    size: "m",
  },
];

const sizeClasses = {
  lg: "h-56 sm:h-96", // Smaller height on mobile
  md: "h-56 sm:h-72",
  sm: "h-56", // Same size across all views
};

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
  }, [selectedProject]);

  return (
    // <motion.section
    //   id="portfolio"
    //   initial="hidden"
    //   whileInView="visible"
    //   viewport={{ once: true, amount: 0.2 }}
    //   className="px-6 py-14 md:py-32 bg-[#F8F8F7] text-black"
    // >
    //   <div className="max-w-5xl mx-auto text-center">
    //     <motion.h1
    //       className="text-3xl md:text-5xl font-bold"
    //       initial={{ opacity: 0, y: -20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.8 }}
    //     >
    //       YOU CHOOSE HOW WE <br />
    //       WORK TOGETHER
    //     </motion.h1>

    //     <motion.p
    //       className="mt-4 text-lg md:text-xl text-gray-600"
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       transition={{ delay: 0.3, duration: 0.8 }}
    //     >
    //       Every business is unique, so we’ve developed a set of adaptable
    //       frameworks suited to your specific needs. Through proven strategies,
    //       clear communication, and relentless performance tracking, we help you
    //       gain and maintain a competitive edge.
    //     </motion.p>

    //     <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 mt-10">
    //       {projects.map((project, index) => (
    //         <motion.div
    //           key={index}
    //           className={`relative overflow-hidden rounded-lg shadow-lg group bg-gray-800 ${
    //             sizeClasses[project.size]
    //           }`}
    //           initial={{ opacity: 0, y: 20 }}
    //           whileInView={{ opacity: 1, y: 0 }}
    //           transition={{ duration: 0.6, delay: index * 0.15 }}
    //         >
    //           <motion.div className="relative w-full h-full">
    //             {/* Image */}
    //             <img
    //               src={project.image}
    //               alt={project.title}
    //               className="object-cover w-full h-full"
    //             />

    //             {/* Always visible text overlay */}
    //             <motion.div className="absolute inset-0 bg-black bg-opacity-50 text-white flex flex-col justify-center items-center p-4 text-center opacity-100">
    //               <h3 className="text-2xl md:text-3xl font-semibold p-2 md:p-4">
    //                 {project.title}
    //               </h3>
    //               <p className="text-gray-300 text-sm md:text-lg p-2 md:p-4">
    //                 {project.description}
    //               </p>
    //             </motion.div>
    //           </motion.div>
    //         </motion.div>
    //       ))}
    //     </div>
    //   </div>
    // </motion.section>


    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-secondary py-12 px-6"
    >
          <div className="text-center mb-8">
            <motion.h1
          className="text-3xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          YOU CHOOSE HOW WE <br />
          WORK TOGETHER
        </motion.h1>

        <motion.div
          className="mt-4  text-lg md:text-xl text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="max-w-5xl mx-auto text-center">

          Every business is unique, so we’ve developed a set of adaptable
          frameworks suited to your specific needs. Through proven strategies,
          clear communication, and relentless performance tracking, we help you
          gain and maintain a competitive edge.
          </div>
        </motion.div>
            {/* <p className="text-gray-600 mt-2">I’m a paragraph. Click here to add your own text and edit me.</p> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto pb-6">
            {projects.map((service, i) =>
              service.size === 'l' && (
                <motion.div 
                  key={i} 
                  className="bg-white  rounded-lg pb-6 shadow hover:shadow-lg transition col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <div className="relative w-full h-60 rounded-lg"> 
                    <Image unoptimized
                      src={service.image} 
                      alt="About us"
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <h3 className="font-semibold text-xl mb-2 pl-6 pr-6 pt-4">{service.title}</h3>
                  <p className="text-gray-600 text-base pl-6 pr-6">{service.description}</p>
                </motion.div>
              )
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto ">
            {projects.map((service, i) =>
              service.size === 'm' && (
                <motion.div 
                  key={i} 
                  className="bg-white rounded-lg pb-6 shadow hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <div className="relative w-full h-60 rounded-lg"> 
                    <Image unoptimized
                      src={service.image}
                      alt="About us"
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <h3 className="font-semibold text-xl mb-2 pl-6 pr-6 pt-4">{service.title}</h3>
                  <p className="text-gray-600 text-base pl-6 pr-6">{service.description}</p>
                </motion.div>
              )
            )}
          </div>
        </motion.section>
  );
}
