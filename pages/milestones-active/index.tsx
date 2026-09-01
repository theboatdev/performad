import Image from "next/image";

const ActiveProject = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-12 flex flex-col-reverse lg:flex-row items-center gap-12">
      {/* Text Section */}
      <div className="w-full lg:w-1/2 space-y-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          Active
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          We were approached by Active Products to launch their premium pressure
          washer brand in the USA & Canada, aiming to break into the highly
          competitive car detailing industry.
        </p>

        <div className="space-y-4">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-gray-800">
            Process
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
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
        </div>

        <div className="space-y-4">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-gray-800">
            Result
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Efficient ad spend with an impressive ACOS of less than 10%, while
            also establishing a strong foundation for organic traffic and brand
            authority on their Shopify store.
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src="/milestones/active-cs.png"
          alt="Active Project"
          width={500}
          height={500}
          className="rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
        />
      </div>
    </div>
  );
};

export default ActiveProject;
