import React from "react";

interface Step {
    title: string;
    description: string;
}

interface WorkflowSectionProps {
    steps: Step[];
}

const WorkflowSection: React.FC<WorkflowSectionProps> = ({ steps }) => {
    return (
        <section className="bg-primary text-white py-12 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-12">
                    Our 3-step workflow
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`bg-white text-black rounded-2xl shadow-md p-6 sm:p-8 relative overflow-hidden transition-transform duration-300 ${index === 1
                                ? "scale-100 sm:scale-105 md:scale-110 sm:p-9"
                                : "scale-100"
                                }`}
                        >
                            <div className="relative z-10">
                                <div className="bg-primary/20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-md mb-3 sm:mb-4">
                                    <span className="text-primary font-bold text-lg sm:text-2xl mt-2">
                                        {index + 1}
                                    </span>
                                </div>

                                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-left">
                                    {step.title}
                                </h3>
                                <p className="text-sm sm:text-base leading-relaxed text-left">
                                    {step.description}
                                </p>
                            </div>

                            {/* Decorative circle */}
                            <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-40 sm:h-40 bg-primary/25 rounded-full translate-x-1/3 translate-y-1/3" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkflowSection;
