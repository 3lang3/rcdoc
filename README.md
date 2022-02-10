# MDOC

Parse markdown content and export the specified template code

## Setup

```
npm i -D @mdoc/core
```


Then you can import front matter attributes from `.md` file as default.

````md
# Hello world

```tsx
import React from 'react';

export default () => {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount(v => v + 1)}>count: {count}</button>;
};
```

````


```tsx
import { MdContent, MdDemos } from './doc.md';
````

### Type declarations

In TypeScript project, need to declare typedefs for `.md` file as you need.

```ts
declare module '*.md' {
  // When "Mode.React" is requested. VFC could take a generic like React.VFC<{ MyComponent: TypeOfMyComponent }>
  import React from 'react';
  type MDocPreviewerProps = {
    code: string;
    lang: string;
    key: string;
    dependencies: Record<
      string,
      {
        type: string;
        value: string;
        css: boolean;
      }
    >;
    meta: Record<string, any>;
    children: React.ReactNode;
  }

  const MdContent: React.VFC<{
    previewer?: (props: MDocPreviewerProps) => React.ReactNode;
  }>;
  const MdDemos: ({ Component: React.VFC; key: string } & Record<string, any>)[];

  const frontmatter: Record<string, string>;

  const slugs: { depth: number; text: string; id: string; }[];

  // Modify below per your usage
  export { MdContent, MdDemos, frontmatter, slugs };
}
```

Save as `vite.d.ts` for instance.

## License

MIT
