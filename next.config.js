/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["icon-library.com", "res.cloudinary.com"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:5000',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
