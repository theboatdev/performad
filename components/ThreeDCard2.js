"use client";

import Image from "next/image";
import React from "react";

export function ThreeDCardDemo2() {
  return (
    <a href="/milestones-active">
      <div className="bg-gray-50 border border-black/10 rounded-xl p-6 w-auto sm:w-[30rem]">
        <h2 className="text-xl font-bold text-black">Active Products</h2>
        <p className="text-black text-sm max-w-sm mt-2">
          Efficient ad spend with an impressive ACOS of less than 10%, while
          also establishing a strong foundation for organic traffic and brand
          authority on their Shopify store.
        </p>
        <div className="w-full mt-4">
          <img
            src="/milestones/active.jpg"
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
