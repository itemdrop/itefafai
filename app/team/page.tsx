export default function Team() {
  const teamMembers = [
    {
      name: "Efan Savage",
      role: "CEO & Founder",
      bio: "Visionary leader with 10+ years of experience in digital strategy and business development. Passionate about creating innovative solutions that drive business growth.",
      skills: ["Strategic Planning", "Business Development", "Team Leadership", "Digital Transformation"],
      social: {
        instagram: "https://www.instagram.com/efansavage_/",
        github: "https://github.com/itemdrop",
        facebook: "https://www.facebook.com/efan.savage",
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
        instagram: "https://www.instagram.com/faisal079957/",
        github: "https://github.com/Fasolia101",
        facebook: "https://www.facebook.com/profile.php?id=100057024851439",
        email: "faisal@yoursite.com"
      },
      image: "bg-gradient-to-br from-green-400 to-green-600"
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">Meet Our <span className="text-blue-600">Team</span></h1>
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
                {member.social.instagram && (
                  <a
                    href={member.social.instagram}
                    className="w-8 h-8 bg-pink-500 text-white rounded flex items-center justify-center hover:bg-pink-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.92 4.92 0 011.675 1.1 4.92 4.92 0 011.1 1.675c.163.46.349 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.92 4.92 0 01-1.1 1.675 4.92 4.92 0 01-1.675 1.1c-.46.163-1.26.349-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.92 4.92 0 01-1.675-1.1 4.92 4.92 0 01-1.1-1.675c-.163-.46-.349-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.92 4.92 0 011.1-1.675 4.92 4.92 0 011.675-1.1c.46-.163 1.26-.349 2.43-.403C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.74 0 8.332.014 7.052.072 5.773.13 4.802.347 4.05.6a6.92 6.92 0 00-2.5 1.65A6.92 6.92 0 00.6 4.05c-.253.752-.47 1.723-.528 3.002C.014 8.332 0 8.74 0 12c0 3.26.014 3.668.072 4.948.058 1.28.275 2.25.528 3.002a6.92 6.92 0 001.65 2.5 6.92 6.92 0 002.5 1.65c.752.253 1.723.47 3.002.528C8.332 23.986 8.74 24 12 24c3.26 0 3.668-.014 4.948-.072 1.28-.058 2.25-.275 3.002-.528a6.92 6.92 0 002.5-1.65 6.92 6.92 0 001.65-2.5c.253-.752.47-1.723.528-3.002.058-1.28.072-1.688.072-4.948 0-3.26-.014-3.668-.072-4.948-.058-1.28-.275-2.25-.528-3.002a6.92 6.92 0 00-1.65-2.5 6.92 6.92 0 00-2.5-1.65c-.752-.253-1.723-.47-3.002-.528C15.668.014 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
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
                {member.social.facebook && (
                  <a
                    href={member.social.facebook}
                    className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35C.596 0 0 .596 0 1.325v21.35C0 23.404.596 24 1.325 24h11.494v-9.294H9.691V11.25h3.128V8.691c0-3.1 1.793-4.785 4.553-4.785 1.325 0 2.75.237 2.75.237v3.025h-1.548c-1.525 0-2.003.949-2.003 1.92v2.313h3.391l-.542 3.456h-2.849V24h5.384c.729 0 1.325-.596 1.325-1.325V1.325C24 .596 23.404 0 22.675 0z" />
                    </svg>
                  </a>
                )}
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