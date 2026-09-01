"use client";

import React from "react";

const cardData = [
  {
    title: "XVERSION",
    description:
      "Increased items sold and revenue by 50% - 100% and maintained a conversion rate between 5% - 10% every month since 2022. Our PPC and ad optimization efforts led to significant improvements in keyword rankings and ROAS between 1 - 3.34 during the period.",
    image: "/milestones/xversion.jpg",
    href: "/milestones-xversion",
  },
  {
    title: "Active Products",
    description:
      "Efficient ad spend with an impressive ACOS of less than 10%, while also establishing a strong foundation for organic traffic and brand authority on their Shopify store.",
    image: "/milestones/active.jpg",
    href: "/milestones-active",
  },
  {
    title: "GNZ - Bio Science",
    description:
      "Achieved an ROAS between 0.6 - 2.5 during the period, and we managed to reduce avg. CPC by 19%. The best results were seen through Google search ads which generated 60% of the revenue without targeting brand keywords.",
    image: "/milestones/gnz.jpg",
    href: "/milestones-gnzbioscience",
  },
];

export function ThreeDCardDemo() {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {cardData.map((card, index) => (
        <a href={card.href} key={index}>
          <div className="bg-gray-50 border border-black/10 rounded-xl p-6 w-auto sm:w-[22rem] h-[25rem] flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-black">{card.title}</h2>
              <p className="text-black text-sm mt-2">{card.description}</p>
            </div>
            <div className="w-full">
              <img
                src={card.image}
                height="1000"
                width="1000"
                className="h-52 w-full object-cover rounded-xl"
                alt="thumbnail"
              />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
