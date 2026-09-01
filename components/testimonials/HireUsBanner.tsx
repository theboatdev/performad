import Image from "next/image";
import React from "react";

const HireUsBanner: React.FC = () => {
  return (
    <section className="bg-primary relative text-white py-20 px-6 text-center overflow-hidden mb-10">
      {/* Background shapes */}
      <div className="absolute inset-0 opacity-20 pl-96 pt-3">
            <Image
                src="/icon.png" 
                alt="logo"
                width={372}
                height={365}
                className="rounded-lg shadow-lg"
            />
      </div>

      <div className="relative z-10">
        <h4 className="text-2xl font-semibold mb-2">Hire Us Now</h4>
        <h2 className="text-4xl sm:text-6xl font-extrabold mb-6">
          We Are Always Ready To <br /> Grow Your Business
        </h2>
        <button className="bg-white text-primary font-semibold px-6 py-2 rounded-md shadow hover:bg-teal-50 transition">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HireUsBanner;
