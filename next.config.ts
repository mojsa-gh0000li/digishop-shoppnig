/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apidigishop.narinsoft.ir",
        pathname: "/uploads/products/**",
      },
    ],
  },
};

export default nextConfig;
