export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  body?: unknown[] | null;
  date: string;
  image: string;
  category: string;
  author: {
    name: string;
    photo: string;
  };
  isPublished: boolean;
}

type BlogSource = {
  _id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string[];
  body?: unknown[];
  image?: string;
  category?: string;
  author?: {
    name?: string;
    photo?: string;
  };
  publishedAt?: string | Date;
  isPublished?: boolean;
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function formatBlogDate(value?: string | Date) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function normalizeBlogPost(blog: BlogSource): BlogPost {
  const slug = blog.slug || slugify(blog.title || "") || String(blog._id || "");

  return {
    id: slug,
    slug,
    title: blog.title || "",
    excerpt: blog.excerpt || "",
    content: Array.isArray(blog.content) ? blog.content : [],
    body: Array.isArray(blog.body) ? blog.body : null,
    date: formatBlogDate(blog.publishedAt),
    image: blog.image || "",
    category: blog.category || "",
    author: {
      name: blog.author?.name || "",
      photo: blog.author?.photo || "",
    },
    isPublished: blog.isPublished ?? true,
  };
}

export function getBlogCategories(blogs: BlogPost[]) {
  return [
    "All",
    ...Array.from(
      new Set(blogs.map((blog) => blog.category).filter(Boolean))
    ),
  ];
}
