import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn() as jest.Mock,
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn() as jest.Mock,
}));

jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 100;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 100;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout - 1);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 100;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval);

    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 100;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval * 3);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'some_folder/file.txt';

    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'nonExistentFile.txt';

    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'existingFile.txt';
    const fileContent = 'This is the content of the test file.';

    (existsSync as jest.Mock).mockReturnValue(true);

    (readFile as jest.Mock).mockResolvedValue(Buffer.from(fileContent));

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(fileContent);
  });
});
