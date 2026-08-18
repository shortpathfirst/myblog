import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  basePath: isProd ? '/myblog' : '',
  assetPrefix: isProd ? '/myblog/' : '',
  // pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    viewTransition: true,
    mdxRs: false, // <-- HERE
  },
};
export default nextConfig;