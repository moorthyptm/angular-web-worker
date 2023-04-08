/// <reference lib="webworker" />

import { FIBONACCI_SERIES } from './action';
import { fibonacci } from './fibonacci';

addEventListener('message', (event) => {
  const { action, data } = event.data;

  if (action === FIBONACCI_SERIES) {
    postMessage(`Worker: Fibonacci Series for ${data} is : ${fibonacci(data)}`);
  }
});
