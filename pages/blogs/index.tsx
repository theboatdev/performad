import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import BlogHero from '../../components/blogs/BlogHero';
import BlogFilter from '../../components/blogs/BlogFilter';
import FeaturedBlogs from '../../components/blogs/FeaturedBlogs';
import BlogGrid from '../../components/blogs/BlogGrid';
import type { GetServerSideProps, NextPage } from 'next';
import dbConnect from '../../contentManagementSystem/lib/mongodb';
import Blog from '../../contentManagementSystem/models/Blog';
import { BlogPost, getBlogCategories, normalizeBlogPost } from '../../lib/blogs';

interface BlogsPageProps {
    blogs: BlogPost[];
}

const BlogsPage: NextPage<BlogsPageProps> = ({ blogs }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = useMemo(() => getBlogCategories(blogs), [blogs]);

    const filteredBlogs = activeCategory === 'All'
        ? blogs
        : blogs.filter(blog => blog.category === activeCategory);

    return (
        <div className="min-h-screen bg-white font-roboto">

            <main>
                <BlogHero />

                <div className="container px-4 mx-auto md:px-10 lg:px-20 -mt-10 mb-20 relative z-20">
                    <div className="p-8 bg-white shadow-2xl rounded-3xl border border-gray-100">
                        <BlogFilter
                            categories={categories}
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                        />

                        {activeCategory === 'All' && (
                            <FeaturedBlogs blogs={blogs.slice(0, 4)} />
                        )}

                        <div className="mt-12">
                            {activeCategory === 'All' ? (
                                <h2 className="mb-12 text-3xl font-bold text-center text-gray-900 md:text-5xl">
                                    Explore Our Latest <span className="text-primary italic">Articles</span>
                                </h2>
                            ) : (
                                <h2 className="mb-8 text-2xl font-bold text-gray-900 border-b pb-4">
                                    Articles in <span className="text-primary">{activeCategory}</span>
                                </h2>
                            )}
                            <BlogGrid blogs={filteredBlogs} />
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default BlogsPage;

export const getServerSideProps: GetServerSideProps<BlogsPageProps> = async () => {
    await dbConnect();

    const docs = await Blog.find({
        isDeleted: false,
        isPublished: true,
    })
        .sort({ publishedAt: -1, createdAt: -1 })
        .lean();

    return {
        props: {
            blogs: docs.map((blog) => normalizeBlogPost({
                ...blog,
                _id: String(blog._id),
            })),
        },
    };
};
