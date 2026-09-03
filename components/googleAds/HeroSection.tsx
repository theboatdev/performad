"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-24">
      
      {/* Left Content */}
      <section className="w-full md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
        <div className="text-primary text-sm md:text-base mb-4">
          Drive high-intent traffic and scalable revenue with Google Ads that actually convert
        </div>

        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold leading-snug mb-6">
          {/* Get <span className="text-primary">unlimited traffic</span> by optimizing your website torank top for Search Engines */}
          We design, manage, and optimize Google Ads campaigns for brands that want predictable growth<br/>not wasted ad spend.
        </h1>

        <button className="bg-primary text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto">
          <span>Get a Free Google Ads Strategy Call</span>
        </button>
      </section>

      {/* Right: Overlapping Images */}
      <div className="w-full md:w-1/2 flex justify-center relative">
        <div className="relative w-full max-w-sm h-56 sm:h-72 md:h-80">
          {/* Back Image */}
          <Image unoptimized
            src="/RectangleHero.png"
            alt="Background"
            fill
            className="rounded-lg shadow-lg absolute top-6 left-6 object-cover"
          />

          {/* Front Image */}
          <Image unoptimized
            src="/googleAds/Google Ads Page Hero.jpg"
            alt="Foreground"
            fill
            className="rounded-lg shadow-lg absolute top-0 left-0 object-cover z-10"
          />
        </div>
      </div>
    </div>
  );
}
