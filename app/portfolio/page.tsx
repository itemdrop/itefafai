import Link from 'next/link';

export default function Portfolio() {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A modern e-commerce solution with advanced features including inventory management, payment processing, and analytics dashboard.",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      image: "bg-gradient-to-br from-blue-400 to-blue-600",
      link: "#"
    },
    {
      title: "Mobile Banking App",
      category: "Mobile Development",
      description: "Secure mobile banking application with biometric authentication, real-time transactions, and financial insights.",
      technologies: ["React Native", "Node.js", "MongoDB", "AWS"],
      image: "bg-gradient-to-br from-green-400 to-green-600",
      link: "#"
    },
    {
      title: "Healthcare Management System",
      category: "Web Development",
      description: "Comprehensive healthcare platform for patient management, appointment scheduling, and medical records.",
      technologies: ["React", "Python", "Django", "MySQL"],
      image: "bg-gradient-to-br from-purple-400 to-purple-600",
      link: "#"
    },
    {
      title: "Real Estate Portal",
      category: "Web Development",
      description: "Property listing platform with advanced search filters, virtual tours, and integrated mortgage calculator.",
      technologies: ["Vue.js", "Laravel", "PostgreSQL", "Redis"],
      image: "bg-gradient-to-br from-orange-400 to-orange-600",
      link: "#"
    },
    {
      title: "Food Delivery App",
      category: "Mobile Development",
      description: "On-demand food delivery application with real-time tracking, multiple payment options, and rating system.",
      technologies: ["Flutter", "Firebase", "Google Maps", "Stripe"],
      image: "bg-gradient-to-br from-red-400 to-red-600",
      link: "#"
    },
    {
      title: "Learning Management System",
      category: "Web Development",
      description: "Educational platform with course management, video streaming, progress tracking, and certification system.",
      technologies: ["Angular", "Spring Boot", "MySQL", "AWS S3"],
      image: "bg-gradient-to-br from-indigo-400 to-indigo-600",
      link: "#"
    }
  ];

  const categories = ["All", "Web Development", "Mobile Development", "UI/UX Design"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Portfolio</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our recent projects and see how we've helped businesses achieve their digital goals.
        </p>
      </div>

      {/* Filter Buttons */}
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

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Project Image Placeholder */}
            <div className={`h-48 ${project.image} flex items-center justify-center`}>
              <div className="text-white text-center">
                <svg className="w-16 h-16 mx-auto mb-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm opacity-80">Project Preview</p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  {project.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <Link
                href={project.link}
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                View Project
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <section className="bg-gray-50 rounded-lg p-8 md:p-12 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Project Statistics</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">5+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Technologies We Use</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {['React', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Python', 'TypeScript', 'AWS', 'MongoDB', 'PostgreSQL', 'Firebase', 'Docker'].map((tech) => (
            <div key={tech} className="text-center p-4 bg-white rounded-lg shadow-sm border">
              <div className="text-lg font-medium text-gray-900">{tech}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-blue-600 text-white rounded-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-4">Like What You See?</h2>
        <p className="text-xl mb-8">Let's work together to create something amazing for your business.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/contact" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Start Your Project
          </Link>
          <Link 
            href="/services" 
            className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Our Services
          </Link>
        </div>
      </section>
    </div>
  );
}