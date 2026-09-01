import React from 'react';

interface BlogFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const BlogFilter: React.FC<BlogFilterProps> = ({ categories, activeCategory, onCategoryChange }) => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`px-6 py-2 text-sm font-medium transition-all border-2 rounded-lg ${activeCategory === category
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-primary border-primary hover:bg-secondary'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default BlogFilter;
