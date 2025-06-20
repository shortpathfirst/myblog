import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const isProd = true;

const nextConfig: NextConfig = {
  basePath: isProd ? '/myblog' : '',
  assetPrefix: isProd ? '/myblog/' : '',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    viewTransition: true,
    mdxRs: false, // <-- HERE
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  // Add markdown plugins here, as desired
  options: {
    // remarkPlugins: [ ],
    // rehypePlugins: [
    //   rehypeSlug,
    //   rehypeAutolinkHeadings,
    //   [
    //     rehypePrettyCode,
    //     {
    //       theme: "one-dark-pro",
    //     },
    //   ],
    // ],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
