import { motion } from "framer-motion";
import { ThreeDCardDemo } from "./ThreeDCard";
import { ThreeDCardDemo2 } from "./ThreeDCard2";
import { ThreeDCardDemo3 } from "./ThreeDCard3";

const projects = [
  {
    title: "XVERSION",
    description:
      "We were tasked with selling the brand’s product in the UAE. The goal was to establish recognition and grow items and revenue.",
    details: {
      process: (
        <>
          <p className="text-5xl md:text-9xl font-extralight">Process</p>
          <p>
            We started the process by recommending the brand to start their
            sales on a Marketplace, and the brand was eager to begin selling
            their products on Amazon. We were then able to compile keyword banks
            for each category that the brand had products in and conduct
            extensive market research on competition, demand, and pricing
            structures. Once this was completed, products were listed and
            optimized for sales on the platform.
          </p>
          <p>
            Due to the high number of competitors in the market and inconsistent
            changes in demand in an online market, listings needed to be
            optimized every month to help it reach the top and maintain its
            position. With our tailored advertising strategy, the keywords were
            also used to help improve indexing, generate more keywords, and
            improve listing visibility.
          </p>
        </>
      ),
      result: (
        <>
          <p className="text-4xl md:text-5xl font-extralight">Result</p>
          <p>
            Increased items sold and revenue by 50% - 100% and maintained a
            conversion rate between 5% - 10% every month since 2022. Our PPC and
            ad optimization efforts led to significant improvements in keyword
            rankings and ROAS between 1 - 3.34 during the period.
          </p>
        </>
      ),
    },
    image: "/milestones/xversion.jpg",
  },
  {
    title: "ACTIVE PRODUCTS",
    description:
      "We were approached by Active Products to launch their premium pressure washer brand in the USA & Canada, aiming to break into the highly competitive car detailing industry.",
    details: {
      process: (
        <>
          <p className="text-5xl md:text-9xl font-extralight">Process</p>
          <p>
            The challenge involved optimizing their Amazon listings to
            outperform competitors, reducing ACOS through PPC strategies, and
            driving organic traffic to their Shopify store, which initially had
            no organic visibility. Additionally, the goal was to establish
            Active Products as a recognized premium brand in the car detailing
            sector. To achieve this, we fully optimized all Amazon listings to
            enhance visibility and conversion rates. We also conducted a
            comprehensive SEO overhaul of the Shopify store, focusing on both
            technical and organic aspects to boost search engine rankings.
          </p>
        </>
      ),
      result: (
        <>
          <p className="text-4xl md:text-5xl font-extralight">Result</p>
          <p>
            Efficient ad spend with an impressive ACOS of less than 10%, while
            also establishing a strong foundation for organic traffic and brand
            authority on their Shopify store.
          </p>
        </>
      ),
    },
    image: "/milestone2.jpg",
  },
  {
    title: "GNZ BIOSCIENCE",
    description:
      "We were tasked with creating a bespoke strategy that appeals to GNZ Bioscience niche pet product customers.",
    details: {
      process: (
        <>
          <p className="text-5xl md:text-9xl font-extralight">Process</p>
          <p>
            After conducting extensive market research and gathering all the
            data, we were able to create a platform strategy and a content
            strategy for them to target the right customer at the right time.
            Results were driven through Google search, YouTube, and Meta. Our
            precise keyword strategy and strong messaging made the brand stand
            out in the highly competitive New Zealand market.
          </p>
        </>
      ),
      result: (
        <>
          <p className="text-4xl md:text-5xl font-extralight">Result</p>
          <p>
            Achieved an ROAS between 0.6 - 2.5 during the period, and we managed
            to reduce avg. CPC by 19%. The best results were seen through Google
            search ads which generated 60% of the revenue without targeting
            brand keywords.
          </p>
        </>
      ),
    },
    image: "/milestone3.jpg",
  },
];

const ProjectShowcase = () => {
  return (
    <div className="w-full bg-[#22A18D] overflow-hidden relative">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-center mt-20 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          MILESTONES WE MADE
        </motion.h1>

        <motion.p
          className="mt-4 text-xl text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Dive into our collection of success stories on how our targeted
          approaches, tailored strategies, <br />
          and data-driven insights overcome complex barriers and consistently
          delivered results.
        </motion.p>
      </div>

      <div className="flex justify-center px-5 my-20">
        <ThreeDCardDemo />
      </div>
    </div>
  );
};

export default ProjectShowcase;
