"use client";

import Image from "next/image";

type ServiceCardProps = {
  title: string;
  description: string;
  link: string;
  image: string;
};

export default function ServiceCard({
  title,
  description,
  link,
  image,
}: ServiceCardProps) {
  return (
    <div className="relative flex flex-col border rounded-xl p-6 bg-white shadow-md hover:shadow-lg transition duration-300 overflow-hidden border-primary">
      {/* Text */}
      <h3 className="text-xl font-semibold mb-3 text-left">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 text-left">{description}</p>

      {/* Button */}
      <a
        href={link}
        className="flex items-center gap-2 text-primary font-medium mt-auto group"
      >
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow group-hover:scale-105 transition">
          ➜
        </div>
        <span className="group-hover:underline">Click Here</span>
      </a>

      {/* Decorative Circle Background */}
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/25 rounded-full translate-x-1/3 translate-y-1/3" />
    </div>
  );
}
