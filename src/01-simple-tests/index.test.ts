import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Add })).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Subtract })).toBe(1);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Multiply })).toBe(1);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Divide })).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({ a: 1, b: 1, action: 'invalid action' }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        a: { value: 2 },
        b: { value: 3 },
        action: Action.Add,
      }),
    ).toBeNull();
  });
});
