# Grid

hello mdoc

```jsx
/**
 * title: hello
 * compact: true
 */

import React from 'react';
import { Button } from 'react-vant';

export default () => {
  const [count, updateCount] = React.useState(0);
  return <Button onClick={() => updateCount((c) => c + 1)}>count: {count}</Button>;
};
```

<API exports='["default", "Other"]' />
