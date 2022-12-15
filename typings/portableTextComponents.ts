export interface MyPortableTextComponents {
  block: {
    h2: ({ children }: { children: JSX.Element }) => JSX.Element;
    h3: ({ children }: { children: JSX.Element }) => JSX.Element;
    cta: ({ children }: { children: JSX.Element }) => JSX.Element;
  };
  marks: {
    link: ({
      value,
      children,
    }: {
      value: any;
      children: JSX.Element;
    }) => JSX.Element;
  };
}
