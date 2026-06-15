/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  turbopack: {},
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.mentholatumarabia.com",
      },
      {
        protocol: "https",
        hostname: "cdn.mentholatumarabia.com",
      },
    ],
  },
};

export default nextConfig;
