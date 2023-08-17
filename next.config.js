/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["icon-library.com", "res.cloudinary.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
