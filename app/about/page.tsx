export default function About() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-Blue mb-4">About <span className="text-Blue">Us</span></h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Learn more about our company, our mission, and what drives us to deliver exceptional results for our clients.
          </p>
        </div>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-Blue mb-6">Our Mission</h2>
            <p className="text-lg text-white mb-4">
              We are dedicated to providing innovative solutions that help businesses thrive in today's digital landscape. 
              Our commitment to excellence and customer satisfaction drives everything we do.
            </p>
            <p className="text-lg text-white">
              With years of experience and a passion for technology, we transform ideas into reality, 
              delivering results that exceed expectations and create lasting value for our clients.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-lg">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-black mb-2">100+</div>
                <div className="text-black">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">50+</div>
                <div className="text-black">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">5+</div>
                <div className="text-black">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">24/7</div>
                <div className="text-black">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md border">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black">Innovation</h3>
            <p className="text-black">We embrace cutting-edge technologies and creative solutions to stay ahead of the curve.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md border">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.Ws 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black">Integrity</h3>
            <p className="text-black">We build trust through transparency, honesty, and ethical business practices.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md border">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black">Excellence</h3>
            <p className="text-black">We strive for perfection in every project, delivering quality that exceeds expectations.</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-gray-50 rounded-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold text-black mb-6">Our Journey</h2>
        <div className="prose max-w-none text-black">
          <p className="text-lg mb-4">
            In August 2025, as part of a school project, I invited a friend to collaborate with me on its development.
            Having prior experience with Next.js and confidence in my web development skills,
            I chose to utilize this framework for the project. 
            This collaboration also provided an opportunity for me to share my knowledge and guide my friend through the process of building a website.
          </p>
          <p className="text-lg mb-4">
         We are continually striving to improve our skills and expand our knowledge in web development. 
         Our goal is to create high-quality, innovative websites that reflect our dedication and attention to detail. 
         We believe that growth comes through constant learning and perseverance, and we are committed to refining our abilities to achieve the best possible results.
          We aim not only to meet expectations but to exceed them, and we will not stop pursuing excellence in everything we create.
          </p>
          <p className="text-lg">
            Today, we continue to evolve and adapt to the changing digital landscape, always staying true to our 
            core values of innovation, integrity, and excellence. We're excited about the future and look forward 
            to helping more businesses achieve their goals through technology. 
            </p>
          <p className="text-lg">
          -CEO Efan Savage & CTO Faisal Faisal Sameer 
          </p>
        </div>
      </section>
      </div>
    </div>
  );
}