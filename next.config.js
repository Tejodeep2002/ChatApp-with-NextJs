/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icon-library.com",
        
       
      },
    ],
  },
};

module.exports = nextConfig;
