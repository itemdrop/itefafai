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
  duration: 0.8
};

// Synchronized transition timing - all animations use this duration
const TRANSITION_DURATION = 0.8;

// Transition overlay variants - synced with page transition and optimized for rapid changes
const overlayVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    rotate: 0
  },
  visible: { 
    opacity: 1,
    scale: 1,
    rotate: 180
  },
  exit: { 
    opacity: 0,
    scale: 1.1,
    rotate: 270
  }
};

// Page loading indicator - synchronized with page transition
const loadingVariants = {
  hidden: { 
    width: 0,
    opacity: 0
  },
  visible: { 
    width: "100%",
    opacity: 1,
    transition: {
      width: {
        duration: TRANSITION_DURATION * 0.7, // Complete 70% through transition
        ease: "easeOut"
      },
      opacity: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

interface PageTransitionProps {
  children?: any;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const previousPathname = useRef<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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
    // Clear any existing timeout to prevent race conditions
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    
    if (previousPathname.current !== pathname && previousPathname.current !== '') {
      setIsTransitioning(true);
      setShowLoading(true);
      
      // Hide loading overlay after most of transition is complete
      loadingTimeoutRef.current = setTimeout(() => {
        setShowLoading(false);
        loadingTimeoutRef.current = null;
      }, TRANSITION_DURATION * 1000 * 0.7);
    }
    
    previousPathname.current = pathname;
    
    // Cleanup on unmount
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
    };
  }, [pathname]);

  return (
    <>
      {/* Transition Overlay Effect - clean central loader only */}
      <AnimatePresence>
        {showLoading && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            onAnimationComplete={(definition) => {
              if (definition === "exit") {
                setShowLoading(false);
              }
            }}
          >
            {/* Animated Logo/Icon - synchronized rotation */}
            <div className="relative">
              <motion.div 
                className="w-16 h-16 border-4 border-blue-500 rounded-full"
                animate={{ 
                  borderRadius: ["50%", "25%", "50%"],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: TRANSITION_DURATION * 0.6,
                  repeat: 1,
                  ease: "easeOut"
                }}
              />
              <motion.div 
                className="absolute inset-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-80"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 0.4, 0.8]
                }}
                transition={{ 
                  duration: TRANSITION_DURATION * 0.5,
                  repeat: 1,
                  ease: "easeOut"
                }}
              />
            </div>
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
          setShowLoading(false);
          // Clear any pending timeouts
          if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
            loadingTimeoutRef.current = null;
          }
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
            isolation: 'isolate',
            backfaceVisibility: 'hidden',
            perspective: '1000px'
          }}
          onAnimationStart={(definition) => {
            if (definition === "in") {
              setIsTransitioning(true);
            }
          }}
          onAnimationComplete={(definition) => {
            if (definition === "in") {
              setIsTransitioning(false);
              // Ensure loading is hidden when page transition completes
              setShowLoading(false);
              if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
                loadingTimeoutRef.current = null;
              }
            }
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}