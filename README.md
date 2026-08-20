# myblog

[![Next.js](https://img.shields.io/github/package-json/dependency-version/shortpathfirst/myblog/next?logo=next.js&label=Next.js)](https://nextjs.org)
[![GitHub last commit](https://img.shields.io/github/last-commit/shortpathfirst/myblog?logo=github)](https://github.com/shortpathfirst/myblog/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/shortpathfirst/myblog?logo=github)](https://github.com/shortpathfirst/myblog)


Personal blog & portfolio built with Next.js and MDX  — showcasing data science, web dev and ML projects.

![Preview image](/public/preview.png)
<sup>Open graph image</sup>

## Installation

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Color Palette

| Swatch | Role | Hex |
| :---: | --- | --- |
| ![#dfeaf8](https://img.shields.io/badge/-%20-dfeaf8?style=flat-square) | Background | `#dfeaf8` |
| ![#6c63ff](https://img.shields.io/badge/-%20-6c63ff?style=flat-square) | Title | `#6c63ff` |
| ![#4ea3f1](https://img.shields.io/badge/-%20-4ea3f1?style=flat-square) | Blog | `#4ea3f1` |
| ![#00a3ff](https://img.shields.io/badge/-%20-00a3ff?style=flat-square) | Blog | `#00a3ff` |
| ![#db9951](https://img.shields.io/badge/-%20-db9951?style=flat-square) | Projects | `#db9951` |
| ![#fc4152](https://img.shields.io/badge/-%20-fc4152?style=flat-square) | Projects | `#fc4152` |

## Folder structure
```
src/
├── app/                  ← Pages & routes
│   ├── layout.tsx
│   ├── page.tsx
│   ├── blog/
│   │   └── [slug]/       ← MDX blog posts
│   ├── projects/
│   └── resume/
├── components/
│   ├── Navbar.tsx
│   ├── Chart.tsx 
│   └── Footer.tsx
├── _posts/               ← MDX content + post components
├── content/              ← Static JSON/TS content (projects, tech stack…)
├── lib/                  ← Fetching & helpers (posts.ts, projects.ts…)
└── styles/
    └── globals.css       ← Design tokens & typography

```
# MDX
```tsx
 let post = getBlogPosts().find((post) => post.slug === params.slug)

function getMDXFiles(dir) {}

function readMDXFile(filePath) {}

export async function compileMDX(source: string) {
  return await serialize(source, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypePrettyCode, { theme: 'github-dark' }],
      ],
      format: 'mdx',
    },
  });
}
```
```bash
npm install next-mdx-remote
```
- `next-mdx-remote` (classic) gives you:
  - full support for static generation (SSG)
  - compatibility with `serialize()`
  - predictable MDX processing at build time

# Remark Rehype
| Tool     | Role                            | Example Use                                 |
| -------- | ------------------------------- | ------------------------------------------- |
| `remark` | Parses & transforms Markdown    | Add support for GitHub-style tables         |
| `rehype` | Transforms HTML (post-Markdown) | Syntax highlight code blocks, sanitize HTML |

Plugins used in [posts.ts](src/lib/posts.ts):

| Plugin | Type | Role |
| ------ | ---- | ---- |
| `remark-gfm` | remark | GitHub-flavored Markdown: tables, strikethrough, task lists, autolinks |
| `remark-math` | remark | Parses `$…$` / `$$…$$` math syntax into mdast nodes |
| `rehype-katex` | rehype | Renders parsed math nodes to KaTeX HTML |
| `rehype-slug` | rehype | Adds `id` slugs to headings |
| `rehype-pretty-code` | rehype | Syntax highlighting for code blocks (`github-dark` theme) |
| `rehype-autolink-headings` | rehype | Wraps headings in anchor links (`behavior: 'wrap'`) |

- **Code Highlight** using `rehype-pretty-code`
- **Frontmatter** parsed via `next-mdx-remote`'s `parseFrontmatter: true`
- **Math** rendering via `remark-math` + `rehype-katex`

## SEO
### Robot
```ts
// robot.ts
import { baseUrl } from 'app/sitemap'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```
### Sitemap 
```ts
export default function sitemap(): MetadataRoute.Sitemap {
  
const postsDirectory = path.join(process.cwd(), "src", "_posts");
const mdxFiles = fs.readdirSync(postsDirectory).filter((file) => ['.md', '.mdx'].includes(path.extname(file)));
const slugs = mdxFiles.map((file) => path.basename(file, path.extname(file)));

  const notes = slugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    priority: 1,
    lastModified: new Date().toISOString(),
  }));

  const routes = ['blog', 'projects', 'resume'].map((route) => ({
    url: `${baseUrl}/${route}`,
    priority: 0.8,
    lastModified: new Date().toISOString(),
  }));

  return [
    ...routes,
    ...notes,
  ];
}

```
