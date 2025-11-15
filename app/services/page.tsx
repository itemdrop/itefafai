'use client';

import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies and best practices.",
      features: ["Responsive Design", "SEO Optimization", "Performance Focused", "Mobile-First Approach"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android devices.",
      features: ["Cross-Platform", "Native Performance", "App Store Optimization", "Push Notifications"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to grow your online presence and reach.",
      features: ["SEO & SEM", "Social Media Marketing", "Content Strategy", "Analytics & Reporting"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
    {
      title: "UI/UX Design",
      description: "User-centered design solutions that create engaging and intuitive digital experiences.",
      features: ["User Research", "Wireframing & Prototyping", "Visual Design", "Usability Testing"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      )
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment solutions for modern applications.",
      features: ["AWS & Azure", "DevOps & CI/CD", "Microservices", "Auto-Scaling"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      )
    },
    {
      title: "Consulting",
      description: "Strategic technology consulting to help you make informed decisions for your business.",
      features: ["Technology Strategy", "Digital Transformation", "Process Optimization", "Risk Assessment"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  // Animation variants for service cards
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: (index: number) => ({
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }),
    hover: {
      y: -15,
      scale: 1.04,
      boxShadow: "0 30px 60px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(147, 197, 253, 0.25), 0 0 60px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  // Animation variants for icons
  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  // Animation variants for features
  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + (index * 0.1),
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    })
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">Our <span className="text-blue-600">Services</span></h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto px-4">
            We offer a comprehensive range of digital services to help your business succeed in today's competitive market.
          </p>
        </div>

      {/* Services Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
        initial="hidden"
        animate="visible"
      >
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-300/40 cursor-pointer overflow-hidden relative p-4 sm:p-6"
            style={{
              boxShadow: "0 12px 40px rgba(59, 130, 246, 0.18), 0 0 0 1px rgba(147, 197, 253, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(20px)"
            }}
            variants={cardVariants}
            custom={index}
            whileHover="hover"
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-blue-500/25 to-blue-600/30 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 text-blue-600 border border-blue-400/40"
              style={{
                boxShadow: "0 6px 25px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 20px rgba(147, 197, 253, 0.1)"
              }}
              variants={iconVariants}
              whileHover="hover"
            >
              {service.icon}
            </motion.div>
            
            <motion.h3 
              className="text-lg sm:text-xl font-semibold text-blue-600 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            >
              {service.title}
            </motion.h3>
            
            <motion.p 
              className="text-black mb-4 text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            >
              {service.description}
            </motion.p>
            
            <motion.ul 
              className="space-y-2"
              initial="hidden"
              animate="visible"
            >
              {service.features.map((feature, featureIndex) => (
                <motion.li 
                  key={featureIndex} 
                  className="flex items-center text-sm text-black"
                  variants={featureVariants}
                  custom={featureIndex}
                  whileHover={{
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.svg 
                    className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </motion.svg>
                  {feature}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Process Section */}
      <section className="bg-white/65 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-12 mb-12 sm:mb-16 border border-blue-300/30" style={{
        boxShadow: "0 12px 40px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 0 30px rgba(147, 197, 253, 0.08)"
      }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-8 sm:mb-12">Our Process</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-xl" style={{
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.35), 0 0 0 1px rgba(147, 197, 253, 0.15), 0 0 25px rgba(59, 130, 246, 0.1)"
            }}>1</div>
            <h3 className="text-blue-600 font-semibold mb-2">Discovery</h3>
            <p className="text-black">We understand your needs, goals, and challenges through detailed consultation.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-xl" style={{
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.35), 0 0 0 1px rgba(147, 197, 253, 0.15), 0 0 25px rgba(59, 130, 246, 0.1)"
            }}>2</div>
            <h3 className="text-blue-600  font-semibold mb-2">Planning</h3>
            <p className="text-black">We create a comprehensive strategy and roadmap for your project.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-xl" style={{
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.35), 0 0 0 1px rgba(147, 197, 253, 0.15), 0 0 25px rgba(59, 130, 246, 0.1)"
            }}>3</div>
            <h3 className="text-blue-600 font-semibold mb-2">Execution</h3>
            <p className="text-black">Our team implements the solution with regular updates and feedback loops.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg" style={{
              boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)"
            }}>4</div>
            <h3 className="text-blue-600 font-semibold mb-2">Delivery</h3>
            <p className="text-black">We deliver the final product with ongoing support and maintenance.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-blue-600 text-white rounded-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="text-xl mb-8">Let's discuss how we can help bring your vision to life.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/contact" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started
          </a>
          <a 
            href="/portfolio" 
            className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            View Our Work
          </a>
        </div>
      </section>
      </div>
    </div>
  );
}