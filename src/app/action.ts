export const FIBONACCI_SERIES = 'FIBONACCI_SERIES';

export class FibonacciSeriesAction {
  action = FIBONACCI_SERIES;
  constructor(public data: number) {}
}
