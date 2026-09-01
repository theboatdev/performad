import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BlogPost } from '../../lib/blogs';

interface BlogCardProps {
    blog: BlogPost;
    horizontal?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, horizontal = false }) => {
    if (horizontal) {
        return (
            <div className="flex flex-col gap-4 p-4 transition-all bg-white border border-gray-100 rounded-xl hover:shadow-lg sm:flex-row items-center">
                <div className="relative flex-shrink-0 w-full overflow-hidden rounded-lg sm:w-40 h-28">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                    />
                </div>
                <div className="flex flex-col flex-grow">
                    <h3 className="mb-2 text-lg font-bold text-gray-900 line-clamp-2">
                        {blog.title}
                    </h3>
                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm text-gray-500">{blog.date}</span>
                        <Link href={`/blogs/${blog.id}`}>
                            <a className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                                Read More <ChevronRight size={14} />
                            </a>
                        </Link>
                    </div>
                </div>
                {/* Decorative circle placeholder */}
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-20 h-20 bg-primary/10 rounded-full -z-10"></div>
            </div>
        );
    }

    return (
        <div className="relative group transition-all duration-300 bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                {/* Decorative element like in the screenshot teal circle behind some content */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors"></div>
            </div>
            <div className="flex flex-col flex-grow p-6 relative z-10">
                <h3 className="mb-4 text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                </h3>
                <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                    <span className="flex items-center gap-1 font-medium">
                        <span className="w-2 h-2 rounded-full bg-primary/40"></span>
                        {blog.date}
                    </span>
                </div>
                <Link href={`/blogs/${blog.id}`}>
                    <a className="inline-flex items-center gap-2 mt-auto text-sm font-bold text-primary hover:gap-3 transition-all">
                        Read More <ChevronRight size={16} />
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
