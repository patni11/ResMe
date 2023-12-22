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
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      zlib: false,
    };

    return config;
  },
};

module.exports = nextConfig;
