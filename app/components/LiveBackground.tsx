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

  // Animate particles with requestAnimationFrame for smoother performance
  useEffect(() => {
    let animationFrameId: number;
    
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
      
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animationFrameId = requestAnimationFrame(animateParticles);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [dimensions]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ isolation: 'isolate' }}>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.10) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.09) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating morphing shapes - reduced from 4 to 2 */}
      {[...Array(2)].map((_, index) => {
        const baseX = 150 + index * 300;
        const baseY = 150 + index * 200;
        
        return (
          <motion.div
            key={`shape-${index}`}
            className="absolute opacity-30"
            animate={{
              x: [
                baseX,
                baseX + 60,
                baseX
              ],
              y: [
                baseY,
                baseY + 40,
                baseY
              ],
              rotate: [0, 90, 180],
              borderRadius: ["50%", "30%", "50%"],
              scale: [0.9, 1.05, 0.9]
            }}
            transition={{
              duration: 20 + index * 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: `${80 + index * 30}px`,
              height: `${80 + index * 30}px`,
              background: `linear-gradient(45deg, rgba(59, 130, 246, ${0.06 + index * 0.02}), rgba(147, 197, 253, ${0.04 + index * 0.01}))`,
              border: `1px solid rgba(59, 130, 246, ${0.12 + index * 0.02})`,
              boxShadow: `0 0 15px rgba(59, 130, 246, ${0.08 + index * 0.02})`
            }}
          />
        );
      })}

      {/* Interactive mouse follower - simplified */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: mousePosition.x - 50,
          y: mousePosition.y - 50
        }}
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 20
        }}
      >
        <motion.div
          className="w-24 h-24 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            filter: 'blur(15px)'
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Subtle grid overlay - simplified */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
        animate={{
          opacity: [0.03, 0.08, 0.03]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles - reduced and optimized */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: `rgba(59, 130, 246, ${particle.opacity * 0.6})`,
            boxShadow: `0 0 ${particle.size * 3}px rgba(59, 130, 246, ${particle.opacity * 0.4}), 0 0 ${particle.size * 6}px rgba(59, 130, 246, ${particle.opacity * 0.2})`
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [particle.opacity * 0.8, particle.opacity * 1.2, particle.opacity * 0.8]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Central morphing loader - simplified */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5"
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.div
          className="w-24 h-24 border border-blue-300"
          style={{
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.08)'
          }}
          animate={{
            borderRadius: ["50%", "25%", "50%"],
            scale: [0.9, 1.05, 0.9]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
}