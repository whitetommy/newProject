/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/upload",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/upload`,
      },
    ];
  }
};

module.exports = nextConfig;
