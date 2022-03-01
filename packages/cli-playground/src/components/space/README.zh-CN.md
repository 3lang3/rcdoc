# Space 间距

hello mdoc!

```jsx
import React from 'react';

export default () => {
  const [count, updateCount] = React.useState(0)
  return <button onClick={() => updateCount(c => c + 1)}>space count: {count}</button>
}

```