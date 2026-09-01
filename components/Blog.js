import { motion } from "framer-motion";
import {
  ShoppingCart,
  Megaphone,
  Users,
  Search,
  Target,
  BarChart,
} from "lucide-react"; // Import multiple icons

const icons = {
  "Marketplace Management": ShoppingCart,
  "Marketplace Advertising": Megaphone,
  "Social Media Advertising": Users,
  "Search Engine Advertising": Search,
  "Strategic Lead Generation Ads": Target,
  "Conversion Rate Optimization": BarChart,
};

const BlogCard = ({ image, title, description, readMoreLink }) => {
  const Icon = icons[title] || Megaphone; // Default to ShoppingCart if title not found

  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.05 }} // Hover animation
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-white to-teal-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"
        layout
      />
      <a href={readMoreLink} className="cursor-pointer">
        <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-gray-900/5 h-[250px]">
          {/* Fixed height for card */}
          {/* Animated Icon + Title */}
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ y: [-3, 3, -3] }} // Bouncing effect
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-6 h-6 text-teal-600" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-black">{title}</h3>
          </div>
          <p className="text-black text-md leading-normal line-clamp-3">
            {description}
          </p>
        </div>
      </a>
    </motion.div>
  );
};

export default function BlogPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const blogs = [
    {
      image:
        "https://sanirawaas.com/wp-content/uploads/2023/07/christian-wiediger-rymh7EZPqRs-unsplash-1024x683.jpg",
      title: "Marketplace Management",
      description:
        "Streamline your e-commerce presence across major marketplaces through optimized listings, competitive insights, and comprehensive expert account oversight.",
      readMoreLink: "/marketplaceManagement",
    },
    {
      image:
        "https://sanirawaas.com/wp-content/uploads/2023/07/c-d-x-PDX_a_82obo-unsplash-1024x683.jpg",
      title: " Marketplace Advertising",
      description:
        "Accelerate product visibility on leading marketplaces by leveraging targeted ad campaigns, precise keyword strategies, and data-driven optimizations.",
      readMoreLink: "/googleAds",
    },
    {
      image:
        "https://sanirawaas.com/wp-content/uploads/2023/07/couple-aprons-posing-with-cups-coffee-1024x683.jpg",
      title: "Social Media Advertising",
      description:
        "Elevate brand awareness and conversions through tailored ads, refined audience segments, and highly compelling creative strategies",
      readMoreLink: "/socialMediaAds",
    },
    {
      image:
        "https://sanirawaas.com/wp-content/uploads/2023/07/cropped-image-woman-inputting-card-information-key-phone-laptop-while-shopping-online-1024x683.jpg",
      title: "Search Engine Advertising",
      description:
        "Boost traffic and drive ROI using strategic search engine advertising campaigns, intelligent bidding models, and continuous performance monitoring.",
      readMoreLink: "/googleAds",
    },
    {
      image:
        "https://sanirawaas.com/wp-content/uploads/2023/07/Fulfillment-by-Amazon-FBA-1024x576.jpg",
      title: "Strategic Lead Generation Ads",
      description:
        "Drive high-quality leads with data-driven campaigns, compelling creative, and precision targeting, significantly maximizing conversions and customer acquisition.",
      readMoreLink: "/contactUs",
    },
    {
      image:
        "https://sanirawaas.com/wp-content/uploads/2023/07/showing-cart-trolley-shopping-online-sign-graphic-1024x683.jpg",
      title: "Conversion Rate Optimization",
      description:
        "Maximize revenue potential through data-driven website enhancements, precise funnel diagnostics, and meticulous testing for continuous sales improvements.",
      readMoreLink: "/contactUs",
    },
  ];

  return (
    <section id="services" className="py-10 md:py-20 bg-[#F8F8F7]">
      <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
        <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
          <div className="mb-12 space-y-5 md:mb-16 md:text-center">
            <h1 className="text-center mb-5 text-3xl font-bold text-gray-900 md:text-center md:text-5xl">
              HOW WE HELP BRANDS
            </h1>
            <p className="text-center text-lg text-gray-600 md:text-center md:text-xl">
              We focus on a select set of specialized services, each
              meticulously tailored to elevate your customer experience and
              simplify your operations.
            </p>
          </div>
        </div>
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {blogs.map((blog, index) => (
            <motion.div key={index} variants={itemVariants}>
              <BlogCard {...blog} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
