import { blogPosts } from './posts';

export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  type: 'page' | 'blog' | 'service';
  url: string;
  category?: string;
  author?: string;
}

// Static page content for search
export const staticPages: Omit<SearchResult, 'id'>[] = [
  {
    title: 'Welcome to YourSite∞',
    excerpt: 'Discover our comprehensive services, explore our portfolio, meet our team, and learn more about what makes us unique.',
    type: 'page',
    url: '/',
    category: 'home'
  },
  {
    title: 'About Us',
    excerpt: 'Learn about our company, mission, and values.',
    type: 'page',
    url: '/about',
    category: 'company'
  },
  {
    title: 'Our Services',
    excerpt: 'Web development, mobile app development, digital marketing, UI/UX design, cloud solutions, and consulting.',
    type: 'page',
    url: '/services',
    category: 'services'
  },
  {
    title: 'Portfolio',
    excerpt: 'Explore our portfolio of successful projects and client work.',
    type: 'page',
    url: '/portfolio',
    category: 'work'
  },
  {
    title: 'Our Team',
    excerpt: 'Meet the talented professionals behind our success.',
    type: 'page',
    url: '/team',
    category: 'company'
  },
  {
    title: 'Contact Us',
    excerpt: 'Get in touch with our team to discuss your project needs.',
    type: 'page',
    url: '/contact',
    category: 'contact'
  },
  {
    title: 'Blog',
    excerpt: 'Read our latest insights, tutorials, and industry updates.',
    type: 'page',
    url: '/blog',
    category: 'content'
  }
];

// Service-specific content for better search results
export const services: Omit<SearchResult, 'id'>[] = [
  {
    title: 'Web Development',
    excerpt: 'Custom websites and web applications built with modern technologies. Responsive design, SEO optimization, performance focused.',
    type: 'service',
    url: '/services#web-development',
    category: 'development'
  },
  {
    title: 'Mobile App Development',
    excerpt: 'Native and cross-platform mobile applications for iOS and Android. Cross-platform development with native performance.',
    type: 'service',
    url: '/services#mobile-development',
    category: 'development'
  },
  {
    title: 'Digital Marketing',
    excerpt: 'SEO, SEM, social media marketing, content strategy, and analytics reporting to grow your online presence.',
    type: 'service',
    url: '/services#digital-marketing',
    category: 'marketing'
  },
  {
    title: 'UI/UX Design',
    excerpt: 'User research, wireframing, prototyping, visual design, and usability testing for engaging digital experiences.',
    type: 'service',
    url: '/services#ui-ux-design',
    category: 'design'
  },
  {
    title: 'Cloud Solutions',
    excerpt: 'AWS, Azure, DevOps, CI/CD, microservices, and auto-scaling for modern applications.',
    type: 'service',
    url: '/services#cloud-solutions',
    category: 'infrastructure'
  },
  {
    title: 'Consulting',
    excerpt: 'Technology strategy, digital transformation, process optimization, and risk assessment.',
    type: 'service',
    url: '/services#consulting',
    category: 'strategy'
  }
];

// Function to get all searchable content
export function getAllSearchableContent(): SearchResult[] {
  const allContent: SearchResult[] = [];

  // Add static pages
  staticPages.forEach((page, index) => {
    allContent.push({
      ...page,
      id: `page-${index}`
    });
  });

  // Add services
  services.forEach((service, index) => {
    allContent.push({
      ...service,
      id: `service-${index}`
    });
  });

  // Add blog posts
  blogPosts.forEach((post, index) => {
    allContent.push({
      id: `blog-${index}`,
      title: post.title,
      excerpt: post.excerpt,
      type: 'blog',
      url: `/blog/${post.slug}`,
      category: post.category.toLowerCase(),
      author: post.author
    });
  });

  return allContent;
}

// Search function with fuzzy matching
export function searchContent(query: string, limit: number = 10): SearchResult[] {
  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase().trim();
  const allContent = getAllSearchableContent();
  
  // Score each result based on relevance
  const scoredResults = allContent.map(item => {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const excerptLower = item.excerpt.toLowerCase();
    const categoryLower = item.category?.toLowerCase() || '';
    const authorLower = item.author?.toLowerCase() || '';

    // Exact matches get highest score
    if (titleLower === searchTerm) score += 100;
    else if (titleLower.includes(searchTerm)) score += 50;
    
    if (excerptLower.includes(searchTerm)) score += 30;
    if (categoryLower.includes(searchTerm)) score += 20;
    if (authorLower.includes(searchTerm)) score += 15;
    
    // Word boundary matches get bonus points
    const wordBoundaryRegex = new RegExp(`\\b${searchTerm}`, 'i');
    if (wordBoundaryRegex.test(titleLower)) score += 25;
    if (wordBoundaryRegex.test(excerptLower)) score += 10;

    // Partial word matches
    const searchWords = searchTerm.split(' ');
    searchWords.forEach(word => {
      if (word.length > 2) {
        if (titleLower.includes(word)) score += 15;
        if (excerptLower.includes(word)) score += 10;
      }
    });

    return { ...item, score };
  });

  // Filter results with score > 0 and sort by score
  return scoredResults
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score, ...item }) => item);
}