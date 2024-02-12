import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 0, b: 0, action: Action.Subtract, expected: 0 },
  { a: 1, b: 1, action: Action.Multiply, expected: 1 },
  { a: 0, b: 3, action: Action.Multiply, expected: 0 },
  { a: -2, b: 3, action: Action.Multiply, expected: -6 },
  { a: 1, b: 1, action: Action.Divide, expected: 1 },
  { a: 0, b: 3, action: Action.Divide, expected: 0 },
  { a: -6, b: 2, action: Action.Divide, expected: -3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 0, b: 3, action: Action.Exponentiate, expected: 0 },
  { a: -2, b: 3, action: Action.Exponentiate, expected: -8 },
  { a: 1, b: 1, action: 'invalid action', expected: null },
  { a: { value: 2 }, b: { value: 3 }, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should calculate ${a} ${action} ${b}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });
});
