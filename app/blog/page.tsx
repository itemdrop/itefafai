"use client";
import Link from "next/link";
import { useState } from "react";
import { blogPosts as posts } from "../../lib/posts";

// Derive BlogPost type from data source
type BlogPost = (typeof posts)[number];

export default function Blog() {
  const blogPosts: BlogPost[] = posts;

  // Categories (can include ones without posts yet for future expansion)
  const categories = ["All", "Technology", "Design", "Mobile", "Security", "AI & ML", "Architecture"];
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  const filteredPosts = activeCategory === "All"
    ? regularPosts
    : regularPosts.filter(p => p.category === activeCategory);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: integrate real subscription endpoint here
    // eslint-disable-next-line no-console
    console.log("Newsletter subscription attempted");
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">Our <span className="text-blue-600">Blog</span></h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto px-4">
            Stay updated with the latest insights, trends, and best practices in technology and digital innovation.
          </p>
        </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-12 sm:mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8 md:p-12 text-white">
              <span className="inline-block bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                Featured Post
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{featuredPost.title}</h2>
              <p className="text-lg sm:text-xl mb-6 opacity-90">{featuredPost.excerpt}</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
                  <span className="font-medium">{featuredPost.author}</span>
                  <span className="opacity-75">•</span>
                  <span className="opacity-75">{featuredPost.date}</span>
                  <span className="opacity-75">•</span>
                  <span className="opacity-75">{featuredPost.readTime}</span>
                </div>
                <Link href={`/blog/${featuredPost.slug}`} className="bg-white text-blue-600 px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base inline-block">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12" aria-label="Filter blog posts by category">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryClick(category)}
              aria-pressed={isActive}
              className={
                `px-6 py-2 rounded-full border text-sm sm:text-base transition-colors ` +
                (isActive
                  ? "bg-blue-600 text-white border-blue-600 shadow"
                  : "border-gray-300 text-white hover:bg-blue-600 hover:text-white hover:border-blue-600")
              }
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" aria-live="polite">
        {filteredPosts.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 text-center text-white opacity-80">
            No posts found for "{activeCategory}".
          </div>
        )}
        {filteredPosts.map((post) => (
          <article key={post.slug} className="bg-white/70 backdrop-blur-lg rounded-2xl overflow-hidden hover:scale-[1.04] hover:-translate-y-3 transition-all duration-300" style={{
            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(147, 197, 253, 0.1), 0 0 25px rgba(59, 130, 246, 0.08)"
          }}>
            {/* Post Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center" role="img" aria-label={`${post.category} illustration`}>
              <div className="text-4xl" aria-hidden="true">
                {post.category === 'Architecture' ? '🏗️' : 
                 post.category === 'Design' ? '🎨' : 
                 post.category === 'Mobile' ? '📱' : 
                 post.category === 'AI & ML' ? '🤖' : '💻'}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-sm text-black">{post.readTime}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-black mb-2 hover:text-blue-600 cursor-pointer">
                {post.title}
              </h3>
              
              <p className="text-black mb-4">{post.excerpt}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium text-black">{post.author}</div>
                    <div className="text-xs text-black">{post.date}</div>
                  </div>
                </div>
                <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 font-medium">Read More</Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Signup */}
      <section className="bg-white/65 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16" style={{
        boxShadow: "0 12px 35px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(147, 197, 253, 0.1)"
      }}>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-xl text-black mb-8">
            Get the latest articles and insights delivered straight to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-4" aria-label="Newsletter subscription form">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Popular Tags */}
      <section>
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Popular Tags</h2>
        <div className="flex flex-wrap gap-3">
          {['JavaScript', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'UI/UX', 'Mobile Development', 'Cloud Computing', 'DevOps', 'AI/ML', 'Cybersecurity'].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-gray-100 text-black rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}