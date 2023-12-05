/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "icons8.com",
      "api.producthunt.com",
      "producthunt.com",
      "vitals.vercel-insights.com",
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
