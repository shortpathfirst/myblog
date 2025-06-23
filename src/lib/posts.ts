import fs from "fs";
import path from 'path';
import { join } from "path";
import { BlogPost, MetadataBlog } from "./interfaces";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeSlug from "rehype-slug";
import { ReactElement } from "react";
import remarkGfm from "remark-gfm";

const postsDirectory = join(process.cwd(), "src", "_posts");

// Get all .mdx files in a given directory
function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => ['.md', '.mdx'].includes(path.extname(file)));
}

// Read and parse a single MDX file using next-mdx-remote instead of gray-matter
async function readMDXFile(filePath: string): Promise<{ metadata: MetadataBlog; content: ReactElement; }> {
  const rawContent = fs.readFileSync(filePath, 'utf-8');

  // Dynamically import the TSX component from the posts folder
  // const Demo = (await import(`@/_posts/`)).default

  const { frontmatter, content } = await compileMDX<MetadataBlog>({
    source: rawContent,
    components: {
      //Add components to use in MDX
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, { theme: 'github-dark' }],
          [rehypeAutolinkHeadings, {
            behavior: 'wrap'
          }],
        ],
      },
    }
  })

  return { metadata: frontmatter as MetadataBlog, content };
}

// Aggregate all blog post data
export async function getBlogPosts(): Promise<BlogPost[]> {
  const mdxFiles = getMDXFiles(postsDirectory);

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const { metadata, content } = await readMDXFile(path.join(postsDirectory, file));
      const slug = path.basename(file, path.extname(file));

      return {
        metadata,
        slug,
        content,
      };
    }))

  posts.sort((a, b) => {
    if (new Date(a.metadata.date) > new Date(b.metadata.date)) return -1
    else return 1;
  });

  return posts;
}
