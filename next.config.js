/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['campusify.io'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig

