import Image from "next/image";
import { FC } from "react";

interface ListItemProps {
  text: string;
}

const Icon = () => (
  <div className="bg-primary rounded-lg px-2 items-center">
    <Image unoptimized
      src={'/icon.png'}
      width={10}
      height={10}
      className=""
      alt=""
    />
  </div>
);

const ListItem: FC<ListItemProps> = ({ text }) => (
  <div className="flex items-start gap-3">
    <Icon />
    <p className="text-gray-600  leading-relaxed">{text}</p>
  </div>
);

export default function WhatWeDontDo() {
  const listText1 =
    "We don’t manage accounts passively";
  const listText2 =
    "We don’t rely on templates or generic listing structures";
  const listText3 =
    "We don’t run ads without profitability context";
  const listText4 =
    "We don’t chase rankings without conversion impact";
  const listText5 =
    "We don’t lock brands into long contracts without performance focus";
  

  return (
    <section className="bg-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center font-bold text-2xl md:text-3xl mb-8">
          What We <span className="text-black">DON'T DO</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative w-full h-64 rounded-xl">
            <Image unoptimized
              src="/What we don't do.jpg"
              alt="What we don't do"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* List Items */}
          <div className="flex flex-col gap-6">
            <ListItem text={listText1} />
            <ListItem text={listText2} />
            <ListItem text={listText3} />
            <ListItem text={listText4} />
            <ListItem text={listText5} />
          </div>
        </div>
      </div>
    </section>
  );
};
