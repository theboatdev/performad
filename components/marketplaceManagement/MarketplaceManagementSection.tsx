import React from "react";

interface MarketplaceManagementSectionProps {
    tag: string;
    title: string;
    highlight: string;
    description: string;
    buttonText: string;
    imageSrc?: string;
}

const MarketplaceManagementSection: React.FC<MarketplaceManagementSectionProps> = ({
    tag,
    title,
    highlight,
    description,
    buttonText,
    imageSrc,
}) => {
    return (
        <section className="bg-gray-100 py-16">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-10">
                {/* Left Text Section */}
                <div className="flex-1 space-y-5 text-center md:text-left">
                    {/* Tag */}
                    <span className="inline-block bg-primary/20 text-primary font-medium px-4 py-1 rounded-full text-sm">
                        {tag}
                    </span>

                    {/* Title */}
                    <h2 className="text-3xl md:text-5xl font-bold leading-snug">
                        {title} <br />{" "}
                        <span className="text-primary">{highlight}</span>
                    </h2>

                    {/* Description */}
                    <p className="max-w-lg mx-auto md:mx-0">
                        {description}
                    </p>

                    {/* Button */}
                    <button className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-emerald-700 transition flex items-center gap-2 mx-auto md:mx-0">
                        {buttonText}
                        <span>→</span>
                    </button>
                </div>

                {/* Right Image Section */}
                <div className="hidden md:block flex-1">
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt="Marketplace Management"
                            className="w-full rounded-lg shadow-md"
                        />
                    ) : (
                        <div className="w-full h-64 md:h-80 bg-gray-300 flex items-center justify-center rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MarketplaceManagementSection;
