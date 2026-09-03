import groq from "groq";

export const blogPostsQuery = groq`
  *[_type == "blogPost" && isPublished == true] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishedAt,
    isPublished,
    mainImage,
    author{
      name,
      photo
    },
    body
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug && isPublished == true][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishedAt,
    isPublished,
    mainImage,
    author{
      name,
      photo
    },
    body
  }
`;

export const blogPostSlugsQuery = groq`
  *[_type == "blogPost" && isPublished == true && defined(slug.current)][].slug.current
`;

export const jobListingsQuery = groq`
  *[_type == "jobListing" && isPublished == true] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    body,
    location,
    salary,
    tags,
    applyUrl,
    image,
    publishedAt,
    isPublished
  }
`;

export const jobListingBySlugQuery = groq`
  *[_type == "jobListing" && slug.current == $slug && isPublished == true][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    body,
    location,
    salary,
    tags,
    applyUrl,
    image,
    publishedAt,
    isPublished
  }
`;

export const jobListingSlugsQuery = groq`
  *[_type == "jobListing" && isPublished == true && defined(slug.current)][].slug.current
`;
