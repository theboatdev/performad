import type { SanityImageSource } from "@sanity/image-url";
import { blogs as staticBlogs } from "../../data/blogs";
import {
  BlogPost,
  formatBlogDate,
  normalizeBlogPost,
  slugify,
} from "../../lib/blogs";
import { hasSanityConfig } from "../env";
import { client } from "./client";
import { urlForImage } from "./image";
import {
  blogPostBySlugQuery,
  blogPostSlugsQuery,
  blogPostsQuery,
} from "./queries";

type SanityBlogPost = {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  isPublished?: boolean;
  mainImage?: SanityImageSource;
  author?: {
    name?: string;
    photo?: SanityImageSource;
  };
  body?: unknown[];
};

function mapSanityBlog(blog: SanityBlogPost): BlogPost {
  return normalizeBlogPost({
    _id: blog._id,
    slug: blog.slug || slugify(blog.title || ""),
    title: blog.title,
    excerpt: blog.excerpt,
    category: blog.category,
    publishedAt: blog.publishedAt,
    isPublished: blog.isPublished,
    image: blog.mainImage
      ? urlForImage(blog.mainImage).width(1600).height(900).url()
      : "",
    author: {
      name: blog.author?.name || "Perfomad",
      photo: blog.author?.photo
        ? urlForImage(blog.author.photo).width(200).height(200).url()
        : "/images/logo.png",
    },
    body: blog.body,
  });
}

function mapStaticBlogs(): BlogPost[] {
  return staticBlogs.map((blog) => ({
    id: blog.id,
    slug: blog.id,
    title: blog.title,
    excerpt: blog.excerpt,
    content: blog.content,
    body: null,
    date: blog.date || formatBlogDate(),
    image: blog.image,
    category: blog.category,
    author: blog.author,
    isPublished: true,
  }));
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!hasSanityConfig()) {
    return mapStaticBlogs();
  }

  try {
    const posts = await client.fetch<SanityBlogPost[]>(blogPostsQuery);
    return posts.map(mapSanityBlog);
  } catch (error) {
    console.error("Failed to fetch blog posts from Sanity:", error);
    return mapStaticBlogs();
  }
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  if (!hasSanityConfig()) {
    return mapStaticBlogs().find((blog) => blog.slug === slug) || null;
  }

  try {
    const post = await client.fetch<SanityBlogPost | null>(
      blogPostBySlugQuery,
      { slug }
    );
    return post ? mapSanityBlog(post) : null;
  } catch (error) {
    console.error("Failed to fetch blog post from Sanity:", error);
    return mapStaticBlogs().find((blog) => blog.slug === slug) || null;
  }
}

export async function getBlogPostSlugs(): Promise<string[]> {
  if (!hasSanityConfig()) {
    return mapStaticBlogs().map((blog) => blog.slug);
  }

  try {
    return await client.fetch<string[]>(blogPostSlugsQuery);
  } catch (error) {
    console.error("Failed to fetch blog slugs from Sanity:", error);
    return mapStaticBlogs().map((blog) => blog.slug);
  }
}
