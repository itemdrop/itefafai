// Basic React types
declare namespace React {
  type ReactNode = any;
  interface Component<P = {}, S = {}> {}
  interface FunctionComponent<P = {}> {
    (props: P & { children?: ReactNode }): any;
  }
  type FC<P = {}> = FunctionComponent<P>;
  function useState<S>(initialState: S): [S, (value: S) => void];
  function useEffect(effect: () => void, deps?: any[]): void;
  function useRef<T>(initialValue: T): { current: T };
  interface HTMLAttributes<T> {
    className?: string;
    onClick?: () => void;
    children?: ReactNode;
    style?: any;
    [key: string]: any;
  }
  interface SVGAttributes<T> extends HTMLAttributes<T> {
    fill?: string;
    stroke?: string;
    strokeWidth?: any;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    viewBox?: string;
    d?: string;
  }
}

// Global JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Next.js modules
declare module "next" {
  export interface Metadata {
    title?: string;
    description?: string;
    [key: string]: any;
  }
}

declare module "next/font/google" {
  export function Geist(options: any): any;
  export function Geist_Mono(options: any): any;
}

declare module "next/link" {
  interface LinkProps {
    href: string;
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    [key: string]: any;
  }
  const Link: React.FC<LinkProps>;
  export default Link;
}

declare module "next/navigation" {
  export function usePathname(): string;
  export function useRouter(): any;
  export function useSearchParams(): any;
}

// React modules
declare module "react" {
  export = React;
  export as namespace React;
}

declare module "react-dom" {
  export const render: any;
  export const createRoot: any;
}

// Framer Motion
declare module "framer-motion" {
  export const motion: any;
  export const AnimatePresence: any;
}

// CSS modules
declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}