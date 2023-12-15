/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "icons8.com",
      "api.producthunt.com",
      "producthunt.com",
      "vitals.vercel-insights.com",
      "uploadthing.com",
      "localhost:3000",
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
