import Image from "next/image";

const XVersionProject = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-12 flex flex-col-reverse lg:flex-row items-center gap-12">
      {/* Text Section */}
      <div className="w-full lg:w-1/2 space-y-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          XVERSION
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          We were tasked with selling the brand’s product in the UAE. The goal
          was to establish recognition and grow items and revenue.
        </p>

        <div className="space-y-4">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-gray-800">
            Process
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            We started the process by recommending the brand to start their
            sales on a Marketplace, and the brand was eager to begin selling
            their products on Amazon. We were then able to compile keyword banks
            for each category that the brand had products in and conduct
            extensive market research on competition, demand, and pricing
            structures. Once this was completed, products were listed and
            optimized for sales on the platform.
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Due to the high number of competitors in the market and inconsistent
            changes in demand in an online market, listings needed to be
            optimized every month to help it reach the top and maintain its
            position. With our tailored advertising strategy, the keywords were
            also used to help improve indexing, generate more keywords, and
            improve listing visibility.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-gray-800">
            Result
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Increased items sold and revenue by 50% - 100% and maintained a
            conversion rate between 5% - 10% every month since 2022. Our PPC and
            ad optimization efforts led to significant improvements in keyword
            rankings and ROAS between 1 - 3.34 during the period.
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src="/milestones/xversion-cs.png"
          alt="XVersion Project"
          width={500}
          height={500}
          className="rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
        />
      </div>
    </div>
  );
};

export default XVersionProject;
