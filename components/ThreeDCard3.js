"use client";

import Image from "next/image";
import React from "react";

export function ThreeDCardDemo3() {
  return (
    <a href="/milestones-gnzbioscience">
      <div className="bg-gray-50 border border-black/10 rounded-xl p-6 w-auto sm:w-[30rem]">
        <h2 className="text-xl font-bold text-black">GNZ - Bio Science</h2>
        <p className="text-black text-sm max-w-sm mt-2">
          Achieved an ROAS between 0.6 - 2.5 during the period, and we managed
          to reduce avg. CPC by 19%. The best results were seen through Google
          search ads which generated 60% of the revenue without targeting brand
          keywords.
        </p>
        <div className="w-full mt-4">
          <img
            src="/milestones/gnz.jpg"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl"
            alt="thumbnail"
          />
        </div>
      </div>
    </a>
  );
}
