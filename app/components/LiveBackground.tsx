'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function LiveBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  // Initialize dimensions and particles
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 25; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          size: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.6 + 0.3
        });
      }
      setParticles(newParticles);
    };

    if (dimensions.width > 0) {
      generateParticles();
    }
  }, [dimensions]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;

          // Bounce off edges
          if (newX <= 0 || newX >= dimensions.width) {
            particle.speedX *= -1;
            newX = Math.max(0, Math.min(dimensions.width, newX));
          }
          if (newY <= 0 || newY >= dimensions.height) {
            particle.speedY *= -1;
            newY = Math.max(0, Math.min(dimensions.height, newY));
          }

          return {
            ...particle,
            x: newX,
            y: newY
          };
        })
      );
    };

    const interval = setInterval(animateParticles, 32);
    return () => clearInterval(interval);
  }, [dimensions]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.12) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.14) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.12) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating morphing shapes */}
      {[...Array(4)].map((_, index) => {
        const baseX = 100 + index * 200;
        const baseY = 100 + index * 150;
        
        return (
          <motion.div
            key={`shape-${index}`}
            className="absolute opacity-40"
            animate={{
              x: [
                baseX,
                baseX + 100,
                baseX
              ],
              y: [
                baseY,
                baseY + 80,
                baseY
              ],
              rotate: [0, 180, 360],
              borderRadius: ["50%", "25%", "50%"],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{
              duration: 25 + index * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: `${60 + index * 25}px`,
              height: `${60 + index * 25}px`,
              background: `linear-gradient(45deg, rgba(59, 130, 246, ${0.08 + index * 0.02}), rgba(147, 197, 253, ${0.06 + index * 0.01}))`,
              border: `2px solid rgba(59, 130, 246, ${0.15 + index * 0.03})`,
              boxShadow: `0 0 20px rgba(59, 130, 246, ${0.1 + index * 0.02})`
            }}
          />
        );
      })}

      {/* Interactive mouse follower */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: mousePosition.x - 75,
          y: mousePosition.y - 75
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 15
        }}
      >
        <motion.div
          className="w-40 h-40 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 360]
          }}
          transition={{
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 15, repeat: Infinity, ease: "linear" }
          }}
        />
      </motion.div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: `rgba(59, 130, 246, ${particle.opacity * 4.5})`,
            boxShadow: `0 0 ${particle.size * 6}px rgba(59, 130, 246, ${particle.opacity * 3.5}), 0 0 ${particle.size * 12}px rgba(59, 130, 246, ${particle.opacity * 0.8}), 0 0 ${particle.size * 18}px rgba(147, 197, 253, ${particle.opacity * 0.4})`
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [particle.opacity * 9, particle.opacity * 11.5, particle.opacity * 18]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
        animate={{
          opacity: [0.05, 0.12, 0.05],
          backgroundSize: ['60px 60px', '80px 80px', '60px 60px']
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Central morphing loader (more visible) */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10"
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.div
          className="w-32 h-32 border-2 border-blue-300"
          style={{
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.1)'
          }}
          animate={{
            borderRadius: ["50%", "20%", "50%"],
            scale: [0.8, 1.1, 0.8]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute inset-3 bg-gradient-to-r from-blue-400 to-blue-600 opacity-15"
          animate={{
            borderRadius: ["50%", "20%", "50%"],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
}