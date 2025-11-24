import Link from "next/link";
import { blogPosts } from "../../../lib/posts";

// Next.js 15 dynamic route params are async; await before using
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl p-8">Post not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <div className="mb-6">
          <Link href="/blog" className="text-sm text-blue-600">← Back to blog</Link>
        </div>

        <h1 className="text-3xl font-bold text-black mb-2">{post.title}</h1>
        <div className="text-sm text-gray-600 mb-6">{post.author} • {post.date} • {post.readTime}</div>

        <div className="prose text-black">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
}
