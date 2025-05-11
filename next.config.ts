import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const isProd = process.env.NODE_ENV === 'production';


const nextConfig: NextConfig = {
  basePath: isProd ? '/myblog' : '',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
