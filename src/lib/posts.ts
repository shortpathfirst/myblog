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
const componentsDir = join(process.cwd(), 'src', '_posts', '_components');

// Get all .mdx files in a given directory
function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => ['.md', '.mdx'].includes(path.extname(file)));
}
// Get all .tsx components in a given directory
function getComponentsFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter(file => file.endsWith('.tsx'));
}
// Dynamically load all components from the _components folder using import()
async function loadMDXComponents() {
  const componentFiles = getComponentsFiles(componentsDir);
  const components: Record<string, React.ComponentType> = {};

  await Promise.all(
    componentFiles.map(async (file) => {
      const componentName = path.basename(file, '.tsx');
      const imported_module = await import(`@/_posts/_components/${file}`);
      components[componentName] = imported_module.default;
    })
  );
  return components;
}

// Read and parse a single MDX file using next-mdx-remote instead of gray-matter
async function readMDXFile(filePath: string): Promise<{ metadata: MetadataBlog; content: ReactElement; }> {
  const rawContent = fs.readFileSync(filePath, 'utf-8');

  // Dynamically import the TSX component from the posts folder
  // const Demo = (await import(`@/_posts/`)).default

  const { frontmatter, content } = await compileMDX<MetadataBlog>({
    source: rawContent.replace(/\/myblog/g, ''),
    components: await loadMDXComponents(),
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
