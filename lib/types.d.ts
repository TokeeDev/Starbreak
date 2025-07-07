declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          'camera-controls'?: boolean;
          'auto-rotate'?: boolean;
          ar?: boolean;
          'shadow-intensity'?: string;
          style?: React.CSSProperties;
        },
        HTMLElement
      >;
    }
  }
}

// This empty export is needed to make the file a module.
export {}; 