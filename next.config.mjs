/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@wharfkit/session",
    "@wharfkit/web-renderer",
    "@wharfkit/wallet-plugin-anchor",
  ],
};

export default nextConfig;
