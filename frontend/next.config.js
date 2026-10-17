/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // TypeScript 7 provides a CLI instead of the legacy compiler API.
    useTypeScriptCli: true,
  },
  compiler: {
    // styledComponentsの有効化
    styledComponents: true,
  },
};

export default nextConfig;
