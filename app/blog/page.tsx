export default function Blog() {
  const blogPosts = [
    {
      title: "Building Scalable Applications with Microservices",
      excerpt: "Learn how microservices architecture can help you build more maintainable and scalable applications.",
      author: "Efan Savage",
      date: "March 10, 2025",
      category: "Architecture",
      readTime: "8 min read",
      featured: false
    },
    {
      title: "UX Design Principles That Drive Conversions",
      excerpt: "Discover the key UX design principles that can significantly improve your website's conversion rates.",
      author: "Lina Witt",
      date: "March 8, 2025",
      category: "Design",
      readTime: "6 min read",
      featured: false
    },
    {
      title: "Mobile-First Development: Best Practices",
      excerpt: "Essential strategies for implementing mobile-first development in your next project.",
      author: "Faisal Faisal Sameer",
      date: "March 5, 2025",
      category: "Mobile",
      readTime: "7 min read",
      featured: false
    },
    {
      title: "The Rise of AI in Software Development",
      excerpt: "How artificial intelligence is transforming the way we develop, test, and deploy software applications.",
      author: "Phil Savage",
      date: "February 28, 2025",
      category: "AI & ML",
      readTime: "9 min read",
      featured: false
    }
  ];

  const categories = ["All", "Technology", "Design", "Mobile", "Security", "AI & ML", "Architecture"];
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our <span className="text-blue-600">Blog</span></h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest insights, trends, and best practices in technology and digital innovation.
          </p>
        </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden">
            <div className="p-8 md:p-12 text-white">
              <span className="inline-block bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                Featured Post
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{featuredPost.title}</h2>
              <p className="text-xl mb-6 opacity-90">{featuredPost.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{featuredPost.author}</span>
                  <span className="opacity-75">•</span>
                  <span className="opacity-75">{featuredPost.date}</span>
                  <span className="opacity-75">•</span>
                  <span className="opacity-75">{featuredPost.readTime}</span>
                </div>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {regularPosts.map((post, index) => (
          <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Post Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                {post.title}
              </h3>
              
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{post.author}</div>
                    <div className="text-xs text-gray-500">{post.date}</div>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Read More
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Signup */}
      <section className="bg-gray-50 rounded-lg p-8 md:p-12 mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest articles and insights delivered straight to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Tags</h2>
        <div className="flex flex-wrap gap-3">
          {['JavaScript', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'UI/UX', 'Mobile Development', 'Cloud Computing', 'DevOps', 'AI/ML', 'Cybersecurity'].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors"
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