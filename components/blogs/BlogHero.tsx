import React from 'react';

const BlogHero = () => {
    return (
        <section className="relative py-20 overflow-hidden bg-white">
            {/* Background Patterns */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute top-10 left-10 w-64 h-64 border-[40px] border-primary rotate-45 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 border-[40px] border-primary rotate-12 transform translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 border-[20px] border-primary rotate-[30deg] transform -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
            </div>

            <div className="container relative z-10 px-4 mx-auto text-center">
                <span className="inline-block px-4 py-1 mb-6 text-sm font-semibold text-primary bg-secondary rounded-full">
                    Blogs
                </span>
                <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
                    Our Insightful Blog
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-gray-600">
                    I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.
                </p>
            </div>
        </section>
    );
};

export default BlogHero;
