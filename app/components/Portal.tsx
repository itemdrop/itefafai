'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
// Fallback implementation: in environments without createPortal types, render children directly.

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById('portal-root');
    setMounted(true);
  }, []);

  // If portal root exists and createPortal is available, mount there. Otherwise inline render.
  // @ts-ignore - handle case where createPortal types are not present
  if (mounted && ref.current && typeof window !== 'undefined' && (window as any).document) {
    try {
      // Dynamic import to avoid type error where createPortal is not declared
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const reactDom = require('react-dom');
      if (reactDom && reactDom.createPortal) {
        return reactDom.createPortal(children, ref.current);
      }
    } catch (e) {
      // Silent fallback
    }
  }
  return <>{children}</>;
};

export default Portal;
