/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
    // Netlify's /_ipx/ image optimizer returns 502 in production;
    // serve files from /public directly instead.
    unoptimized: true,
  },
  // Required for embedded Sanity Studio
  transpilePackages: ["next-sanity"],
};
