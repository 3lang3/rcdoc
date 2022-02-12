import React from 'react';

export default () => {
  const [count, setCount] = React.useState<number>(0)
  return (
    <button onClick={() => setCount(v => v + 1)}>test1.tsx: {count}</button>
  )
}