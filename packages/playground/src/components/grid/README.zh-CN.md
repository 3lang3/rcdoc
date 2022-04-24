# Button 按钮

hello mdoc!

```jsx
import React from 'react';

export default () => {
  const [count, updateCount] = React.useState(0);
  return <button onClick={() => updateCount((c) => c + 1)}>count: {count}</button>;
};
```

<API exports='["default", "Other"]' />
