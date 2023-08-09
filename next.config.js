/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "1"
        ? {
            source: "/((?!maintenance).*)",
            destination: "/maintenance",
            permanent: false,
          }
        : null,
    ].filter(Boolean);
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
