import Image from "next/image";

const GNZProject = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-12 flex flex-col-reverse lg:flex-row items-center gap-12">
      {/* Text Section */}
      <div className="w-full lg:w-1/2 space-y-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          GNZ Bioscience
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          We were tasked with creating a bespoke strategy that appeals to GNZ
          Bioscience niche pet product customers.
        </p>

        <div className="space-y-4">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-gray-800">
            Process
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            After conducting extensive market research and gathering all the
            data, we were able to create a platform strategy and a content
            strategy for them to target the right customer at the right time.
            Results were driven through Google search, YouTube, and Meta. Our
            precise keyword strategy and strong messaging made the brand stand
            out in the highly competitive New Zealand market.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-gray-800">
            Result
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Achieved an ROAS between 0.6 - 2.5 during the period, and we managed
            to reduce avg. CPC by 19%. The best results were seen through Google
            search ads which generated 60% of the revenue without targeting
            brand keywords.
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src="/milestones/gnz.jpg"
          alt="GNZ Project"
          width={500}
          height={500}
          className="rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
        />
      </div>
    </div>
  );
};

export default GNZProject;
