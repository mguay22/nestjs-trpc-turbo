/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/trpc/:path*",
        destination: `${process.env.TRPC_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
