# Space

hello mdoc!!!!!!

```jsx
/**
 * title: space demo 1
 * export: false
 */

import React from 'react';
import { Space } from 'mdoc-demo';

export default () => {
  const [count, updateCount] = React.useState(0)
  return <Space onClick={() => updateCount(c => c + 1)}>space demo 1: {count}</Space>
}
```

### space demo 2

```jsx
/**
 * title: space demo 2
 * export: false
 */

import React from 'react';
import { Space } from 'mdoc-demo';

export default () => {
  const [count, updateCount] = React.useState(0)
  return <Space onClick={() => updateCount(c => c + 1)}>space demo 2: {count}</Space>
}
```