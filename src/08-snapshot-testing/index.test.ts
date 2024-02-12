import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3, 4, 5];
    const expectedLinkedList = {
      next: {
        next: {
          next: {
            next: {
              next: {
                next: null,
                value: null,
              },
              value: 5,
            },
            value: 4,
          },
          value: 3,
        },
        value: 2,
      },
      value: 1,
    };

    const generatedLinkedList = generateLinkedList(elements);

    expect(generatedLinkedList).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const elements = [5, 4, 3, 2, 1];

    const generatedLinkedList = generateLinkedList(elements);

    expect(generatedLinkedList).toMatchSnapshot();
  });
});
