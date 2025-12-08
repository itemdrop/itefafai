// Temporary fix for React 19 TypeScript compatibility issues
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module "next/link" {
  const Link: any;
  export default Link;
}

declare module "next/image" {
  const Image: any;
  export default Image;
}

export {};