import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: jest.fn().mockImplementation((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.clearAllTimers(); // Clear any timers set by Jest
  });

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    const createSpy = jest.spyOn(axios, 'create');
    const axiosInstanceMock: any = {
      get: jest.fn().mockResolvedValue({ data: null }),
    };

    createSpy.mockReturnValue(axiosInstanceMock);

    await throttledGetDataFromApi('/posts');
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(createSpy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/feed';

    const createSpy = jest.spyOn(axios, 'create');
    const axiosInstanceMock: any = {
      get: jest.fn().mockResolvedValue({ data: null }),
    };

    createSpy.mockReturnValue(axiosInstanceMock);

    await throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(axiosInstanceMock.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const responseData = { data: 'some data', status: 200 };

    const createSpy = jest.spyOn(axios, 'create');
    const axiosInstanceMock: any = {
      get: jest.fn().mockResolvedValue({ data: responseData }),
    };

    createSpy.mockReturnValue(axiosInstanceMock);

    const result = await throttledGetDataFromApi('/feed');
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(result).toEqual(responseData);
  });
});
