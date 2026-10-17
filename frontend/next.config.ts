import type { NextConfig } from 'next';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // TypeScript 7 provides a CLI instead of the legacy compiler API.
    useTypeScriptCli: true,
  },
} satisfies NextConfig;

export default nextConfig;
