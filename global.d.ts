declare namespace React {
  type Key = string | number | null;
  type ReactText = string | number;
  type ReactChild = ReactElement | ReactText;
  type ReactNode = ReactChild | ReactChild[] | boolean | null | undefined;
  type JSXElementConstructor<P> = ((props: P) => ReactElement | null) | (new (props: P) => Component<P, any>);

  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key;
  }

  interface Component<P = {}, S = {}> {
    render(): ReactElement | null;
  }
  
  interface PureComponent<P = {}, S = {}> extends Component<P, S> {}
  
  interface FunctionComponent<P = {}> {
    (props: P & { children?: ReactNode }): ReactElement | null;
  }

  type FC<P = {}> = FunctionComponent<P>;

  function useState<S>(initialState: S | (() => S)): [S, (value: S | ((prevState: S) => S)) => void];
  function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  function useRef<T>(initialValue: T): { current: T };

  interface HTMLAttributes<T> {
    className?: string;
    id?: string;
    style?: any;
    onClick?: (event: any) => void;
    onChange?: (event: any) => void;
    onSubmit?: (event: any) => void;
    children?: ReactNode;
    [key: string]: any;
  }

  interface SVGAttributes<T> extends HTMLAttributes<T> {
    fill?: string;
    stroke?: string;
    strokeWidth?: string | number;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    viewBox?: string;
    d?: string;
  }
}

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    
    interface IntrinsicElements {
      // HTML Elements
      html: React.HTMLAttributes<HTMLHtmlElement> & { lang?: string; };
      body: React.HTMLAttributes<HTMLBodyElement>;
      div: React.HTMLAttributes<HTMLDivElement>;
      span: React.HTMLAttributes<HTMLSpanElement>;
      p: React.HTMLAttributes<HTMLParagraphElement>;
      h1: React.HTMLAttributes<HTMLHeadingElement>;
      h2: React.HTMLAttributes<HTMLHeadingElement>;
      h3: React.HTMLAttributes<HTMLHeadingElement>;
      h4: React.HTMLAttributes<HTMLHeadingElement>;
      h5: React.HTMLAttributes<HTMLHeadingElement>;
      h6: React.HTMLAttributes<HTMLHeadingElement>;
      a: React.HTMLAttributes<HTMLAnchorElement> & { href?: string; };
      button: React.HTMLAttributes<HTMLButtonElement> & { type?: string; disabled?: boolean; 'aria-label'?: string; };
      input: React.HTMLAttributes<HTMLInputElement> & { type?: string; value?: string; placeholder?: string; required?: boolean; };
      textarea: React.HTMLAttributes<HTMLTextAreaElement> & { rows?: number; value?: string; placeholder?: string; required?: boolean; };
      select: React.HTMLAttributes<HTMLSelectElement> & { value?: string; required?: boolean; };
      option: React.HTMLAttributes<HTMLOptionElement> & { value?: string; };
      form: React.HTMLAttributes<HTMLFormElement>;
      label: React.HTMLAttributes<HTMLLabelElement> & { htmlFor?: string; };
      img: React.HTMLAttributes<HTMLImageElement> & { src?: string; alt?: string; };
      nav: React.HTMLAttributes<HTMLElement>;
      section: React.HTMLAttributes<HTMLElement>;
      article: React.HTMLAttributes<HTMLElement>;
      aside: React.HTMLAttributes<HTMLElement>;
      header: React.HTMLAttributes<HTMLElement>;
      footer: React.HTMLAttributes<HTMLElement>;
      main: React.HTMLAttributes<HTMLElement>;
      ul: React.HTMLAttributes<HTMLUListElement>;
      ol: React.HTMLAttributes<HTMLOListElement>;
      li: React.HTMLAttributes<HTMLLIElement>;
      
      // SVG Elements
      svg: React.SVGAttributes<SVGSVGElement>;
      path: React.SVGAttributes<SVGPathElement>;
      circle: React.SVGAttributes<SVGCircleElement>;
      rect: React.SVGAttributes<SVGRectElement>;
      line: React.SVGAttributes<SVGLineElement>;
      
      // Fallback for any other elements
      [elemName: string]: any;
    }
  }
}

declare module 'react' {
  export = React;
}

declare module 'next/link' {
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

declare module 'next/navigation' {
  export function usePathname(): string;
  export function useRouter(): any;
  export function useSearchParams(): any;
}

declare module 'next' {
  export interface Metadata {
    title?: string;
    description?: string;
    [key: string]: any;
  }
}

declare module 'next/font/google' {
  export function Geist(options: { variable?: string; subsets?: string[] }): any;
  export function Geist_Mono(options: { variable?: string; subsets?: string[] }): any;
}

declare module 'framer-motion' {
  export const motion: any;
  export const AnimatePresence: any;
}