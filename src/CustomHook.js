import React, { useState } from 'react';

const Counter = (initialValue) => {
  const [count, setCount] = useState(initialValue);
  const increament = () => setCount(count + 1);
  return [count, increament];
};
export default Counter;
