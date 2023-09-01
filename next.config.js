/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["icon-library.com", "res.cloudinary.com"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('wrtc'); // Replace 'wrtc' with the actual WebRTC package you are using
    }
    return config;
  },
};

module.exports = nextConfig;
