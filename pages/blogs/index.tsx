import React, { useMemo, useState } from 'react';
import BlogHero from '../../components/blogs/BlogHero';
import BlogFilter from '../../components/blogs/BlogFilter';
import FeaturedBlogs from '../../components/blogs/FeaturedBlogs';
import BlogGrid from '../../components/blogs/BlogGrid';
import type { GetStaticProps, NextPage } from 'next';
import { blogs as staticBlogs } from '../../data/blogs';
import { BlogPost, getBlogCategories } from '../../lib/blogs';

interface BlogsPageProps {
    blogs: BlogPost[];
}

function toBlogPost(blog: (typeof staticBlogs)[number]): BlogPost {
    return {
        id: blog.id,
        slug: blog.id,
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        date: blog.date,
        image: blog.image,
        category: blog.category,
        author: blog.author,
        isPublished: true,
    };
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

export const getStaticProps: GetStaticProps<BlogsPageProps> = async () => {
    return {
        props: {
            blogs: staticBlogs.map(toBlogPost),
        },
    };
};
