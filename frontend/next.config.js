/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // TypeScript 7 provides a CLI instead of the legacy compiler API.
    useTypeScriptCli: true,
  },
};

export default nextConfig;
