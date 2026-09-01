import React from "react";

type TestimonialCardProps = {
    text: string;
    name: string;
    role: string;
    image: string;
};

export default function TestimonialCard({
    text,
    name,
    role,
    image,
}: TestimonialCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto">
            {/* Quote Icon */}
            <div className="text-gray-300 text-6xl leading-none">“</div>

            {/* Text */}
            <p className="text-gray-800 text-lg font-medium mt-2">{text}</p>

            {/* Profile Section */}
            <div className="flex items-center mt-6">
                <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={image}
                    alt={name}
                />
                <div className="ml-3">
                    <p className="text-gray-900 font-semibold text-left">{name}</p>
                    <p className="text-gray-500 text-sm text-left">{role}</p>
                </div>
            </div>
        </div>
    );
}
