// fibonacci.test.js
const generateFibonacci = require('./fibonacci');

test('generates the first 5 Fibonacci numbers', () => {
  expect(generateFibonacci(5)).toEqual([0, 1, 1, 2, 3]);
});

test('returns only [0] for n = 1', () => {
  expect(generateFibonacci(1)).toEqual([0]);
});

test('throws an error for non-integer input', () => {
  expect(() => generateFibonacci('five')).toThrow('Input must be a positive integer');
});
