export default function Team() {
  const teamMembers = [
    {
      name: "Efan Savage",
      role: "CEO & Founder",
      bio: "Visionary leader with 10+ years of experience in digital strategy and business development. Passionate about creating innovative solutions that drive business growth.",
      skills: ["Strategic Planning", "Business Development", "Team Leadership", "Digital Transformation"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "savage@yoursite.com"
      },
      image: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      name: "Faisal Faisal Sameer",
      role: "CTO & Lead Developer",
      bio: "Full-stack developer and technology architect with expertise in scalable web applications and cloud infrastructure. Loves solving complex technical challenges.",
      skills: ["Full-Stack Development", "Cloud Architecture", "DevOps", "System Design"],
      social: {
        linkedin: "#",
        github: "#",
        email: "faisal@yoursite.com"
      },
      image: "bg-gradient-to-br from-green-400 to-green-600"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet Our <span className="text-blue-600">Team</span></h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Our diverse team of experts is passionate about delivering exceptional results and helping your business succeed.
          </p>
        </div>

      {/* Team Members Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 max-w-4xl">
          {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Profile Image Placeholder */}
            <div className={`h-48 sm:h-64 ${member.image} flex items-center justify-center`}>
              <div className="text-white text-center">
                <div className="w-16 sm:w-24 h-16 sm:h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 sm:w-12 h-8 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <p className="text-xs sm:text-sm opacity-80">Profile Photo</p>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3 text-sm sm:text-base">{member.role}</p>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{member.bio}</p>
              
              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Expertise:</h4>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-3">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    className="w-8 h-8 bg-blue-400 text-white rounded flex items-center justify-center hover:bg-blue-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    className="w-8 h-8 bg-gray-800 text-white rounded flex items-center justify-center hover:bg-gray-900 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
                <a
                  href={`mailto:${member.social.email}`}
                  className="w-8 h-8 bg-gray-600 text-white rounded flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Company Culture Section */}
      <section className="bg-gray-50 rounded-lg p-8 md:p-12 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Culture & Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
            <p className="text-gray-600">We believe great results come from working together, sharing ideas, and supporting each other's growth.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-gray-600">We stay at the forefront of technology, always exploring new ways to solve problems and create value.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Passion</h3>
            <p className="text-gray-600">We're passionate about what we do and committed to delivering exceptional results for our clients.</p>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="text-center bg-blue-600 text-white rounded-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
        <p className="text-xl mb-8">We're always looking for talented individuals who share our passion for excellence.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/contact" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            View Open Positions
          </a>
          <a 
            href="/contact" 
            className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Send Your Resume
          </a>
        </div>
      </section>
      </div>
    </div>
  );
}