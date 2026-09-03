"use client";
import Image from 'next/image';

interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function HeroSection({ title, subtitle, description }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto pb-8 md:pb-24 pt-0 md:pt-12">
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center md:text-left">
          <div className="flex gap-4 mb-4 justify-center md:justify-start">
            <span className="bg-primary/25 text-primary font-semibold px-4 py-1 rounded-full text-base">About Us</span>
            <span className="text-gray-500 font-semibold text-base py-1">{subtitle || "Who Are We?"}</span>
          </div>
          <h1 className="text-5xl md:text-5xl font-bold mb-4">
            {title ? title : <>We Are <span className="text-primary">Developers</span></>}
          </h1>
          <p className="text-gray-600 text-xl mb-8 leading-relaxed">
            {description || "We help medium to large-scale businesses accelerate digital growth through measurable, profit-driven strategies."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-primary text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-secondary transition duration-300">Start Your Growth Journey →</button>
            <button className="border border-black text-black font-semibold px-6 py-3 rounded-lg hover:bg-secondaryBackground transition duration-300">View Our Work</button>
          </div>
        </div>
      </section>
      <div className="md:w-1/2 p-4 bg-primary rounded-lg">
        <Image unoptimized src="/About Page Hero.jpg" alt="About us" width={508} height={312} className="rounded-lg shadow-lg" />
      </div>
    </div>
  );
}