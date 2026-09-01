/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
    // Netlify's /_ipx/ image optimizer returns 502 in production;
    // serve files from /public directly instead.
    unoptimized: true,
  },
};
