---
group:
  title: 'Inline Group'
---

# Space

hello mdoc!

```jsx
/**
 * title: hello
 * export: false
 */

import React from 'react';

export default () => {
  const [count, updateCount] = React.useState(0)
  return <button onClick={() => updateCount(c => c + 1)}>space count: {count}</button>
}

```