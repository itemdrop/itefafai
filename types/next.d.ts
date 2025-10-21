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
  export function Inter(options: any): any;
  export function Roboto(options: any): any;
}

declare module "next/link" {
  import { ReactNode } from "react";
  
  interface LinkProps {
    href: string;
    className?: string;
    children?: ReactNode;
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