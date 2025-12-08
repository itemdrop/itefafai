import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-6">
            Welcome to <span className="text-blue-600">YourSite</span>
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Discover our comprehensive services, explore our portfolio, meet our team, 
            and learn more about what makes us unique in delivering exceptional results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/services" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Our Services
            </Link>
            <Link 
              href="/portfolio" 
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/70 backdrop-blur-lg rounded-2xl hover:scale-[1.04] hover:-translate-y-3 transition-all duration-300" style={{
            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(147, 197, 253, 0.1), 0 0 25px rgba(59, 130, 246, 0.08)"
          }}>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-200 hover:bg-blue-200">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Fast & Reliable</h3>
            <p className="text-black">High-performance solutions delivered with reliability and speed.</p>
          </div>

          <div className="text-center p-6 bg-white/70 backdrop-blur-lg rounded-2xl hover:scale-[1.04] hover:-translate-y-3 transition-all duration-300" style={{
            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(147, 197, 253, 0.1), 0 0 25px rgba(59, 130, 246, 0.08)"
          }}>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-200 hover:bg-green-200">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Proven Results</h3>
            <p className="text-black">Track record of successful projects and satisfied clients.</p>
          </div>

          <div className="text-center p-6 bg-white/70 backdrop-blur-lg rounded-2xl hover:scale-[1.04] hover:-translate-y-3 transition-all duration-300" style={{
            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(147, 197, 253, 0.1), 0 0 25px rgba(59, 130, 246, 0.08)"
          }}>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-200 hover:bg-purple-200">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Expert Team</h3>
            <p className="text-black">Skilled professionals dedicated to your success.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Contact us today to discuss your project and see how we can help.</p>
          <Link 
            href="/contact" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg inline-block"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
