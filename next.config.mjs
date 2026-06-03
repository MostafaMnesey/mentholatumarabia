/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-api.mentholatumarabia.com",
      },
      {
        protocol: "https",
        hostname: "cdn.mentholatumarabia.com",
      }
    ],
  },
};

export default nextConfig;
