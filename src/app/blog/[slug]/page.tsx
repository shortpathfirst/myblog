
import { notFound } from 'next/navigation'
import { getBlogPosts } from '@/lib/posts'
import BlogPageHeader from '@/components/blogposts/blogpageHeader'
import styles from '@/styles/mdx.module.css'

interface BlogParams {

  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()

  return posts.map( (post) => ({
    slug: post.slug,
  }))
}
export async function generateMetadata({ params }: BlogParams) {

  const { slug } = await params; // Only necessary if params is a Promise
  const posts = await getBlogPosts()
  const post = posts.find((post) => post.slug === slug)

  if (!post) {
    return
  }

  const {
    title,
    description,
  } = post.metadata

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      // url: `${baseUrl}/blog/${post.slug}`,
    },
  }
}

export default async function Blog({ params }: BlogParams) {
  
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound()
  }

  return (
    <div className="container">
      <section>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.metadata.title,
              datePublished: post.metadata.date,
              description: post.metadata.description,
            }),
          }}
        />
        <BlogPageHeader data={{
          title: post.metadata.title,
          date: post.metadata.date,
          description: post.metadata.description,
          tags: post.metadata.tags
        }}/>

        <article className={styles.mdxContent} >
          {/* <MDXRemote {...mdxSource} components={mdxComponents} /> */}
          {/* <MDXRemote  source = {post.content}  components={mdxComponents}/> */}
          {post.content}
        </article>

      </section>
    </div>
  )
}