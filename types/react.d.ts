declare module "react" {
  export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: string | number | null;
  }

  export type ReactText = string | number;
  export type ReactChild = ReactElement | ReactText;
  export type ReactNode = ReactChild | ReactChild[] | boolean | null | undefined;
  export type JSXElementConstructor<P> = ((props: P) => ReactElement | null) | (new (props: P) => Component<P, any>);
  export type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
  export type Key = string | number | null;

  export interface Component<P = {}, S = {}> {
    render(): ReactElement | null;
  }

  export interface ComponentClass<P = {}> {
    new (props: P): Component<P, any>;
  }

  export interface FunctionComponent<P = {}> {
    (props: P): ReactElement | null;
  }

  export type FC<P = {}> = FunctionComponent<P>;

  export function useState<S>(initialState: S | (() => S)): [S, (value: S | ((prevState: S) => S)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;

  export interface HTMLAttributes<T> {
    className?: string;
    id?: string;
    style?: any;
    onClick?: (event: any) => void;
    onChange?: (event: any) => void;
    onSubmit?: (event: any) => void;
    children?: ReactNode;
    key?: Key;
    [key: string]: any;
  }

  export interface SVGAttributes<T> extends HTMLAttributes<T> {
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
    interface Element {
      type: any;
      props: any;
      key: any;
    }
    
    interface IntrinsicElements {
      // HTML Elements
      div: any;
      span: any;
      p: any;
      h1: any;
      h2: any;
      h3: any;
      h4: any;
      h5: any;
      h6: any;
      a: any;
      button: any;
      input: any;
      textarea: any;
      select: any;
      option: any;
      form: any;
      label: any;
      img: any;
      nav: any;
      section: any;
      article: any;
      aside: any;
      header: any;
      footer: any;
      main: any;
      ul: any;
      ol: any;
      li: any;
      
      // SVG Elements
      svg: any;
      path: any;
      circle: any;
      rect: any;
      line: any;
      
      // Fallback for any other elements
      [elemName: string]: any;
    }
  }
}