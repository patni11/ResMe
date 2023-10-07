/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "icons8.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
