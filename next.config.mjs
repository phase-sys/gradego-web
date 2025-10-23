/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure Tailwind CSS content paths are correctly configured
  experimental: {
    // Removed serverComponentsExternalPackages: ['recharts'] to fix conflict error
  },
};

export default nextConfig;