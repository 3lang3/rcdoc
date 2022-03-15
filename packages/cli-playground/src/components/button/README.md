# Button

hello mdoc!！

```jsx
/**
 * title: hello
 * export: false
 */

import React from 'react';
import { Button } from 'mdoc-demo'

export default () => {
  const [count, updateCount] = React.useState(0)
  return <Button onClick={() => updateCount(c => c + 1)}>count: {count}</Button>
}
```

<API exports='["default", "Other"]' />