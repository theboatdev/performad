import React from "react";

interface Props {
  title?: string;
  subtitle?: string;
}

export default function HeroSection({ title, subtitle }: Props) {
  return (
    <section
      className="bg-gradient-to-r from-white/25 to-primary 
                 text-center px-4 sm:px-6 md:px-12 py-12 
                 bg-[url('/images/background.png')] 
                 bg-opacity-25 bg-cover bg-center bg-no-repeat"
    >
      <div className="bg-secondary rounded-full inline-block px-4 sm:px-6 py-2 
                      text-primary font-semibold text-base sm:text-base">
        Contact Us
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold py-4 leading-snug">
        {title || <>Grow Your Business With Sri Lanka’s Leading MarTech Agency <br className="hidden sm:block" /> </>}
      </h1>

      <p className="text-lg sm:text-2xl font-bold text-primary mt-2">
        {subtitle || "Performance Marketing Powered by Data, Technology, and Scalable Growth Systems."}
      </p>

      <p className="text-sm sm:text-lg text-gray-600 mt-4 max-w-xl md:max-w-3xl mx-auto leading-relaxed">
        Most agencies run ads. <br className="hidden sm:block" />
        We build marketing systems. <br className="hidden sm:block" />
        At PerfomAd, we combine performance marketing, advanced analytics, and marketing technology to help brands scale across marketplaces, search, and social platforms with measurable results. <br className="hidden sm:block" />
      </p>

      <button className="bg-primary text-white font-medium mt-6 px-5 sm:px-6 py-3 rounded-md hover:bg-primary/90 transition">
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm sm:text-lg">Schedule a Call</span>
        </div>
      </button>
    </section>
  );
}