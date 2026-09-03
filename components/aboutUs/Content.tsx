"use client";
import Image from "next/image";
import logo from "../../public/Icon.png";

interface Props { heading?: string; description?: string; }

export default function Content({ heading, description }: Props) {
  return (
    <div className="w-full bg-primary px-5 py-10 md:py-0">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 text-white">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 capitalize pt-10">
            {heading || <>Grow Your Business <br /> with Strategic <br /> Marketing</>}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed pb-10">
            {description || "PerfomAd® is a performance-driven marketing agency partnering with brands across the USA, Canada, UAE, UK, Singapore, and Sri Lanka. We help medium and large-scale businesses accelerate digital growth through data-backed strategies that focus on measurable results.Our expertise lies in driving eCommerce revenue, improving profitability, and strengthening online brand presence. With specialized teams across Google, Meta, Amazon, Walmart, TikTok, Web UI/UX Design, App Development, and Technology, we build full-funnel marketing systems designed to scale businesses sustainably."}
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <Image unoptimized src={logo} width={400} height={400} alt="Logo" className="opacity-70 w-64 sm:w-80 lg:w-[500px] h-auto" />
        </div>
      </div>
    </div>
  );
}