import React from 'react';
import { BlogPost } from '../../lib/blogs';
import BlogCard from './BlogCard';

interface BlogGridProps {
    blogs: BlogPost[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ blogs }) => {
    if (blogs.length === 0) {
        return (
            <div className="py-16 text-center border border-dashed rounded-2xl border-gray-200 bg-gray-50">
                <h3 className="text-2xl font-bold text-gray-900">No blog posts yet</h3>
                <p className="mt-3 text-gray-600">
                    Check back soon for new articles.
                </p>
            </div>
        );
    }

    return (
        <div className="mb-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default BlogGrid;
