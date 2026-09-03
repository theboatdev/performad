"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const featuresWithout = [
    "Inconsistent post schedule",
    "Low engagement rates",
    "Targeting the wrong audience",
    "Wasted ad spend",
];

const featuresWith = [
    "Strategic Content Planning",
    "Data-driven Audience Targeting",
    "High-converting Ad Creatives",
    "Continuous A/B Testing",
    "Comprehensive ROI Tracking",
    "Engaged Community Building",
    "Expert Campaign Management",
    "And much more...",
];

export default function BrandsSection() {
    return (
        <div className="relative mt-16 md:mt-32">

            {/* ===== BACKGROUND GRADIENT ===== */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 z-0" />

            <div
                className="
          relative
          py-14 md:py-20
          text-center
          px-4 md:px-6
          z-30
          mt-16 md:mt-24
        "
            >
                <h2 className="text-2xl md:text-4xl font-bold mb-1">
                    Scale Your Social Presence
                </h2>
                <h2 className="text-2xl md:text-4xl font-bold mb-10">
                    Without the Guesswork.
                </h2>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                    {/* Without Us */}
                    <div className="bg-white border border-primary rounded-xl p-6 md:p-8 shadow-sm">
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-left md:ml-14">
                            Without us
                        </h3>
                        <hr className="border-primary mb-6" />
                        <ul className="space-y-3 text-left">
                            {featuresWithout.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 md:ml-14">
                                    <div className="bg-primary rounded-lg px-2 py-2 flex items-center justify-center">
                                        <Image unoptimized
                                            src={"/icon.png"}
                                            width={20}
                                            height={20}
                                            alt="icon"
                                        />
                                    </div>
                                    <div className="text-lg md:text-xl font-semibold">
                                        {item}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* With Us */}
                    <div className="bg-teal-700 text-white rounded-xl p-6 md:p-8 shadow-md">
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-left md:ml-14">
                            With us
                        </h3>
                        <hr className="border-white mb-6" />
                        <ul className="space-y-3 text-left">
                            {featuresWith.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 md:ml-14">
                                    <div className="bg-white rounded-lg px-2 py-2 flex items-center justify-center">
                                        <Image unoptimized
                                            src={"/favicon.png"}
                                            width={20}
                                            height={20}
                                            alt="fav"
                                        />
                                    </div>
                                    <div className="text-lg md:text-xl font-semibold">{item}</div>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            {/* ===== MAIN SECTION ===== */}
            <motion.div
                className="relative space-y-6 text-center pb-10 pt-12 z-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-xl md:text-3xl font-semibold tracking-wide text-white uppercase">
                    Social Growth partner with
                </h1>

                <motion.div
                    className="w-[95%] mx-auto bg-white/30 backdrop-blur-sm rounded-lg p-2 md:p-5 overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <motion.div
                        className="flex items-center gap-6 min-w-full"
                        initial={{ x: 0 }}
                        animate={{ x: ["0%", "-100%"] }}
                        transition={{
                            repeat: Infinity,
                            duration: 15,
                            ease: "linear",
                        }}
                    >
                        {[
                            "merc",
                            "hartan",
                            "discovery",
                            "giordana",
                            "ng",
                            "hp",
                            "tcl",
                            "active",
                            "gnz",
                            "simplytek",
                            "cat",
                        ].map((logo, index) => (
                            <img
                                key={index}
                                className="h-4 md:h-8 filter grayscale opacity-90"
                                src={`images/${logo}.png`}
                                alt={logo}
                            />
                        ))}

                        {/* Duplicate logos */}
                        {[
                            "merc",
                            "hartan",
                            "discovery",
                            "giordana",
                            "ng",
                            "hp",
                            "tcl",
                            "active",
                            "gnz",
                            "simplytek",
                            "cat",
                        ].map((logo, index) => (
                            <img
                                key={index + 10}
                                className="h-4 md:h-8 filter grayscale opacity-90"
                                src={`images/${logo}.png`}
                                alt={logo}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
