import React from 'react';
import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import dbConnect from '../../contentManagementSystem/lib/mongodb';
import Blog from '../../contentManagementSystem/models/Blog';
import { BlogPost, normalizeBlogPost } from '../../lib/blogs';

interface BlogPostPageProps {
    blog: BlogPost | null;
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ blog }) => {

    if (!blog) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <h1 className="text-2xl font-bold">Blog post not found</h1>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-roboto">
            <Head>
                <title>{blog.title} | Perfomad</title>
                <meta name="description" content={blog.excerpt} />
            </Head>

            <main className="py-20">
                <div className="container max-w-4xl px-4 mx-auto">
                    <Link href="/blogs">
                        <a className="inline-flex items-center gap-2 mb-8 text-sm font-semibold text-primary hover:gap-3 transition-all">
                            <ArrowLeft size={16} /> Back to Blogs
                        </a>
                    </Link>

                    <header className="mb-12">
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider bg-secondary text-primary rounded-lg">
                            {blog.category}
                        </span>
                        <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl leading-tight">
                            {blog.title}
                        </h1>
                        <div className="flex items-center gap-4 text-gray-600">
                            <div className="w-12 h-12 overflow-hidden rounded-full border-2 border-primary/20">
                                <img src={blog.author.photo} alt={blog.author.name} className="object-cover w-full h-full" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{blog.author.name}</p>
                                <p className="text-sm">{blog.date}</p>
                            </div>
                        </div>
                    </header>

                    <div className="relative mb-12 overflow-hidden rounded-3xl shadow-xl aspect-video">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="prose prose-lg max-w-none prose-teal text-gray-700 leading-relaxed">
                        {blog.content.map((paragraph, index) => (
                            <p key={index} className="mb-6">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BlogPostPage;

export const getServerSideProps: GetServerSideProps<BlogPostPageProps> = async (ctx) => {
    const id = Array.isArray(ctx.params?.id) ? ctx.params?.id[0] : ctx.params?.id;

    if (!id) {
        return { props: { blog: null } };
    }

    await dbConnect();

    const doc = await Blog.findOne({
        slug: id,
        isDeleted: false,
        isPublished: true,
    }).lean();

    if (!doc) {
        return { props: { blog: null } };
    }

    return {
        props: {
            blog: normalizeBlogPost({
                ...doc,
                _id: String(doc._id),
            }),
        },
    };
};
