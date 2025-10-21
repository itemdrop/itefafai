'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// Define page order for navigation direction detection
const pageOrder = ['/', '/about', '/services', '/portfolio', '/blog', '/team', '/contact'];

// Alternative smooth morphing transition (uncomment to use)
const getMorphVariants = (direction: 'forward' | 'backward' | 'none') => {
  return {
    initial: {
      opacity: 0,
      scale: direction === 'none' ? 0.8 : 0.9,
      y: direction === 'forward' ? 40 : direction === 'backward' ? -40 : 20,
      rotateX: direction === 'forward' ? 15 : direction === 'backward' ? -15 : 0,
      filter: 'blur(8px) brightness(0.8)'
    },
    in: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px) brightness(1)'
    },
    out: {
      opacity: 0,
      scale: 1.05,
      y: direction === 'forward' ? -30 : direction === 'backward' ? 30 : -20,
      rotateX: direction === 'forward' ? -10 : direction === 'backward' ? 10 : 0,
      filter: 'blur(4px) brightness(1.2)'
    }
  };
};

const getSlideVariants = (direction: 'forward' | 'backward' | 'none') => {
  const slideDistance = 60;
  
  return {
    initial: {
      opacity: 0,
      x: direction === 'forward' ? slideDistance : direction === 'backward' ? -slideDistance : 0,
      scale: 0.96,
      rotateY: direction === 'forward' ? 3 : direction === 'backward' ? -3 : 0,
      filter: 'blur(4px)'
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      filter: 'blur(0px)'
    },
    out: {
      opacity: 0,
      x: direction === 'forward' ? -slideDistance : direction === 'backward' ? slideDistance : 0,
      scale: 0.94,
      rotateY: direction === 'forward' ? -2 : direction === 'backward' ? 2 : 0,
      filter: 'blur(2px)'
    }
  };
};

const pageTransition = {
  type: 'spring' as const,
  damping: 20,
  stiffness: 300,
  mass: 0.8,
  duration: 0.7
};

// Transition overlay variants
const overlayVariants = {
  hidden: { 
    opacity: 0,
    scale: 0,
    rotate: 0
  },
  visible: { 
    opacity: 1,
    scale: 1,
    rotate: 360
  },
  exit: { 
    opacity: 0,
    scale: 0,
    rotate: 720
  }
};

// Page loading indicator
const loadingVariants = {
  hidden: { width: 0 },
  visible: { 
    width: "100%"
  }
};

interface PageTransitionProps {
  children?: any;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const previousPathname = useRef<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Determine navigation direction
  const getDirection = (from: string, to: string): 'forward' | 'backward' | 'none' => {
    const fromIndex = pageOrder.indexOf(from);
    const toIndex = pageOrder.indexOf(to);
    
    if (fromIndex === -1 || toIndex === -1) return 'none';
    if (toIndex > fromIndex) return 'forward';
    if (toIndex < fromIndex) return 'backward';
    return 'none';
  };
  
  const direction = getDirection(previousPathname.current, pathname);
  const slideVariants = getMorphVariants(direction);
  
  useEffect(() => {
    previousPathname.current = pathname;
  }, [pathname]);

  return (
    <>
      {/* Transition Overlay Effect */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            style={{ 
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.05) 100%)'
            }}
          >
            {/* Animated Logo/Icon */}
            <div className="relative">
              <motion.div 
                className="w-16 h-16 border-4 border-blue-500 rounded-full"
                animate={{ 
                  borderRadius: ["50%", "25%", "50%"],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute inset-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-80"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 0.4, 0.8]
                }}
                transition={{ 
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            {/* Loading Progress Bar */}
            <motion.div 
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-200 rounded-full overflow-hidden"
            >
              <motion.div
                initial="hidden"
                animate="visible" 
                variants={loadingVariants}
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <AnimatePresence 
        mode="wait" 
        initial={false}
        onExitComplete={() => {
          window.scrollTo(0, 0);
          setIsTransitioning(false);
        }}
      >
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={slideVariants}
          transition={pageTransition}
          className="min-h-screen page-container"
          style={{ 
            willChange: 'transform, opacity, filter',
            isolation: 'isolate'
          }}
          onAnimationStart={() => setIsTransitioning(true)}
          onAnimationComplete={() => setIsTransitioning(false)}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}