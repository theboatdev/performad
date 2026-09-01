import React from 'react';
import Link from 'next/link';
import { BlogPost } from '../../lib/blogs';
import BlogCard from './BlogCard';

interface FeaturedBlogsProps {
    blogs: BlogPost[];
}

const FeaturedBlogs: React.FC<FeaturedBlogsProps> = ({ blogs }) => {
    const mainFeatured = blogs[0];
    const sideFeatured = blogs.slice(1, 4);

    if (!mainFeatured) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 gap-8 mb-20 lg:grid-cols-3">
            {/* Main Featured Blog */}
            <div className="lg:col-span-2">
                <div className="relative overflow-hidden group rounded-3xl h-[400px] md:h-[500px]">
                    <img
                        src={mainFeatured.image}
                        alt={mainFeatured.title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider bg-primary rounded-lg">
                            {mainFeatured.category}
                        </span>
                        <h2 className="mb-4 text-3xl font-bold md:text-5xl line-clamp-2">
                            {mainFeatured.title}
                        </h2>
                        <p className="mb-6 text-gray-200 line-clamp-2 max-w-2xl">
                            {mainFeatured.excerpt}
                        </p>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium">{mainFeatured.date}</span>
                            <Link href={`/blogs/${mainFeatured.id}`}>
                                <a className="px-6 py-2 text-sm font-bold text-white transition-all bg-primary rounded-full hover:bg-opacity-90">
                                    Read More
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Side Featured Blogs */}
            <div className="flex flex-col gap-6">
                {sideFeatured.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} horizontal={true} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedBlogs;
