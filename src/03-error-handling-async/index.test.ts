import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const valueToResolve = 'resolved!';

    const result = await resolveValue(valueToResolve);

    expect(result).toStrictEqual(valueToResolve);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Error :(';

    try {
      throwError(errorMessage);
    } catch (e) {
      expect(e).toStrictEqual(new Error(errorMessage));
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (e) {
      expect(e).toStrictEqual(new Error('Oops!'));
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError();
    } catch (e) {
      expect(e).toStrictEqual(new MyAwesomeError());
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    try {
      await rejectCustomError();
    } catch (e) {
      expect(e).toStrictEqual(new MyAwesomeError());
    }
  });
});
